using Microsoft.Extensions.DependencyInjection;

namespace Konteh.Tests
{
    public class BaseIntegrationTest
    {
        protected readonly CustomWebApplicationFactory<Program> _webApplicationFactory;

        public BaseIntegrationTest()
        {
            _webApplicationFactory = new CustomWebApplicationFactory<Program>();
        }

        public HttpClient GetClient() => _webApplicationFactory.CreateClient();

        protected T Resolve<T>() where T : class
        {
            var scope = _webApplicationFactory.Services.CreateScope();
            var service = scope.ServiceProvider.GetRequiredService<T>();
            return service;
        }
    }
}
