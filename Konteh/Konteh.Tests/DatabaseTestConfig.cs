using Konteh.Domain;
using Konteh.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Respawn;

namespace Konteh.Tests
{
    [SetUpFixture]
    public class DatabaseTestConfig
    {
        private static Respawner _respawner;
        private static string _connectionString = "Server=.;Database=KontehDBTest;Trusted_Connection=True;TrustServerCertificate=True;";
        private static IServiceScopeFactory _scopeFactory;

        [OneTimeSetUp]
        public async Task RunBeforeAnyTests()
        {
            await ApplyMigrations();
            _respawner = await Respawner.CreateAsync(_connectionString, new RespawnerOptions
            {
                TablesToIgnore = ["__EFMigrationsHistory"]
            });
            //InsertTestData();
        }

        [OneTimeTearDown]
        public void RunAfterAnyTests()
        {
        }

        public static async Task ResetDatabase()
        {
            await _respawner.ResetAsync(_connectionString);

        }

        private static async Task ApplyMigrations()
        {
            var serviceProvider = new ServiceCollection()
                .AddDbContext<KontehDbContext>(options =>
                    options.UseSqlServer(_connectionString, sqlOptions =>
                        sqlOptions.MigrationsAssembly(typeof(KontehDbContext).Assembly.FullName)))
                .BuildServiceProvider();

            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<KontehDbContext>();
                await context.Database.MigrateAsync();
            }
        }

        public static async Task InsertTestData()
        {
            using (var scope = CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<KontehDbContext>();


                context.Candidates.Add(new Candidate { Name = "Test", Email = "test@example.com" });

                await context.SaveChangesAsync();
            }
        }

        public static async Task DeleteTestData()
        {
            using (var scope = CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<KontehDbContext>();

                var candidates = context.Candidates.Where(c => c.Email == "test@example.com");
                context.Candidates.RemoveRange(candidates);

                await context.SaveChangesAsync();
            }
        }

        private static IServiceScope CreateScope()
        {
            var serviceProvider = new ServiceCollection()
                .AddDbContext<KontehDbContext>(options =>
                    options.UseSqlServer(_connectionString))
                .BuildServiceProvider();

            return serviceProvider.CreateScope();
        }
    }
}
