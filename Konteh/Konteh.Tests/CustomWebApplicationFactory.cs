using Konteh.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Data.Common;

namespace Konteh.Tests
{
    public class CustomWebApplicationFactory<TProgram>
    : WebApplicationFactory<TProgram> where TProgram : class
    {
        public KontehDbContext db;
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {

                var descriptor = services.Single(d => d.ServiceType == typeof(DbContextOptions<KontehDbContext>));
                services.Remove(descriptor);


                var dbConnectionDescriptor = services.FirstOrDefault(
                d => d.ServiceType ==
                    typeof(DbConnection));
                if (dbConnectionDescriptor != null)
                {
                    services.Remove(dbConnectionDescriptor);
                }

                services.AddDbContext<KontehDbContext>(options =>
                {
                    options.UseSqlServer("Server=.;Database=KontehDBTest;Trusted_Connection=True;TrustServerCertificate=True;");
                });

                var sp = services.BuildServiceProvider();

                using var scope = sp.CreateScope();
                var scopedServices = scope.ServiceProvider;
                db = scopedServices.GetRequiredService<KontehDbContext>();
                db.Database.Migrate();
            });

        }

    }
}
