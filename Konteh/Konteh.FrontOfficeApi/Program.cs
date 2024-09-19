using Konteh.Domain;
using Konteh.FrontOfficeApi.Features.Exam;
using Konteh.Infrastructure;
using Konteh.Infrastructure.Repositories;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<KontehDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IRepository<Question>, QuestionRepository>();
builder.Services.AddScoped<IRepository<ExamQuestion>, ExamQuestionRepository>();
builder.Services.AddScoped<IRepository<Exam>, ExamRepository>();
builder.Services.AddScoped<IRepository<Candidate>, CandidateRepository>();
builder.Services.AddScoped<IRandomNumberGenerator, RandomNumberGenerator>();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

builder.Services.AddOpenApiDocument(o => o.SchemaSettings.SchemaNameGenerator = new CustomSwaggerSchemaNameGenerator());

builder.Services.AddMassTransit(x =>
{
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("localhost", "/", c =>
        {
            c.Username("admin");
            c.Password("admin");
        });
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseCors("AllowSpecificOrigins");
app.UseHttpsRedirection();

app.UseAuthorization();


app.MapControllers();

app.UseOpenApi();
app.UseSwaggerUi();

app.Run();

public partial class Program { }