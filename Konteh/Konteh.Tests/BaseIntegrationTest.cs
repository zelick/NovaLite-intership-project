
using Microsoft.VisualStudio.TestPlatform.TestHost;

namespace Konteh.Tests
{
    public class BaseIntegrationTest
    {
        private readonly CustomWebApplicationFactory<Program> _webApplicationFactory;

        public BaseIntegrationTest()
        {
            _webApplicationFactory = new CustomWebApplicationFactory<Program>();
        }

        public HttpClient GetClient() => _webApplicationFactory.CreateClient();
    }
}
