using Konteh.Domain;
using Konteh.Infrastructure;
using Konteh.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<KontehDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IRepository<Question>, QuestionRepository>();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

builder.Services.AddOpenApiDocument(o => o.SchemaSettings.SchemaNameGenerator = new CustomSwaggerSchemaNameGenerator());


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseOpenApi();
app.UseSwaggerUi();

app.Run();
