using FluentValidation;
using Konteh.BackOfficeApi.Consumers;
using Konteh.BackOfficeApi.HubConfig;
using Konteh.Domain;
using Konteh.Infrastructure;
using Konteh.Infrastructure.ExeptionHandler;
using Konteh.Infrastructure.PiplineBehaviour;
using Konteh.Infrastructure.Repositories;
using MassTransit;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));



builder.Services.AddControllers();

builder.Services.AddDbContext<KontehDbContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IRepository<Question>, QuestionRepository>();
builder.Services.AddScoped<IRepository<Answer>, AnswerRepository>();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddOpenApiDocument(o => o.SchemaSettings.SchemaNameGenerator = new CustomSwaggerSchemaNameGenerator());

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials();
        });
});


builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<ExamRequestedConsumer>();

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("localhost", "/", h =>
        {
            h.Username("admin");
            h.Password("admin");
        });

        cfg.ReceiveEndpoint("exam-requested-queue", e =>
        {
            e.ConfigureConsumer<ExamRequestedConsumer>(context);
        });
    });
});

builder.Services.AddSignalR();

var app = builder.Build();


// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigins");

app.UseExceptionHandler();


app.UseAuthentication();

app.UseAuthorization();


app.MapHub<ExamHub>("/examHub");

app.MapControllers();


app.UseOpenApi();
app.UseSwaggerUi();

app.Run();
