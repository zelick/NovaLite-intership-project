using Konteh.FrontOfficeApi.Features.Exam;
using System.Net;
using System.Net.Http.Json;

namespace Konteh.Tests
{
    public class GenerateExamIntegrationTests : BaseIntegrationTest
    {

        public GenerateExamIntegrationTests()
        {
        }
        [SetUp]
        public async Task Setup()
        {
            await DatabaseTestConfig.ResetDatabase();
        }
        [Test]
        public async Task CreateExam_Returns_ExamResponse()
        {
            //TODO dodaj u bazu nova polja
            var candidateRequest = new GenerateExam.Command
            {
                Name = "Djordje",
                Surname = "Loncar",
                Email = "loncardjole@gmail.com"
            };
            var _client = GetClient();
            _client.BaseAddress = new Uri("https://localhost:7096/");
            var response = await _client.PostAsJsonAsync("api/exams", candidateRequest);

            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));

            var examResponse = await response.Content.ReadFromJsonAsync<GenerateExam.Response>();
            Assert.That(examResponse, Is.Not.Null);
            Assert.That(examResponse.Id, Is.GreaterThan(0));
            Assert.That(examResponse.ExamQuestions, Is.Not.Empty);
            Assert.That(examResponse.ExamQuestions.Count, Is.EqualTo(10));
        }
    }
}
