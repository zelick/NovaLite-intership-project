using Konteh.BackOfficeApi;
using Konteh.BackOfficeApi.Features.Questions;
using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using Respawn;
using System.Net.Http.Json;

namespace Konteh.Tests;

public class CreateOrUpdateIntegrationTest : BaseIntegrationTest<Program>
{
    private static Respawner _respawner;
    private static string _connectionString = "Server=.;Database=KontehDBTest;Trusted_Connection=True;TrustServerCertificate=True;";
    private HttpClient _client;
    private readonly IRepository<Question> _questionRepository;

    public CreateOrUpdateIntegrationTest()
    {
        _questionRepository = Resolve<IRepository<Question>>();
    }

    [SetUp]
    public async Task Setup()
    {
        _client = GetClient();
        _respawner = await Respawner.CreateAsync(_connectionString, new RespawnerOptions
        {
            TablesToIgnore = ["__EFMigrationsHistory"]
        });
        await _respawner.ResetAsync(_connectionString);

    }

    [TearDown]
    public void RunAfterTest()
    {
        _client.Dispose();
    }

    [Test]
    public async Task CreateQuestion_ShouldReturnSuccess()
    {
        var command = new CreateOrUpdateQuestion.Command
        {
            Text = "Pitanje Test",
            Type = QuestionType.Checkbox,
            Category = QuestionCategory.CSharp,
            Answers = new List<CreateOrUpdateQuestion.AnswerRequest>
            {
                new CreateOrUpdateQuestion.AnswerRequest { Text = "Answer 1", IsCorrect = true },
                new CreateOrUpdateQuestion.AnswerRequest { Text = "Answer 5", IsCorrect = true },
                new CreateOrUpdateQuestion.AnswerRequest { Text = "Answer 2", IsCorrect = false }
            }
        };

        var response = await _client.PostAsJsonAsync("api/questions", command);
        var questions = _questionRepository.GetAll().Result;

        Assert.That(response.IsSuccessStatusCode, Is.True, "Expected response status to be success.");
        var createdQuestion = questions.FirstOrDefault(q => q.Text == command.Text && q.Type == command.Type && q.Category == command.Category);

        Assert.That(createdQuestion, Is.Not.Null, "Expected the created question to exist in the repository.");
        Assert.That(createdQuestion.Answers.Count, Is.EqualTo(3), "Expected the question to have 3 answers.");
        Assert.That(createdQuestion.Answers.Any(a => a.Text == "Answer 1" && a.IsCorrect), Is.True, "Expected one of the answers to be 'Answer 1' and marked as correct.");
        Assert.That(createdQuestion.Answers.Any(a => a.Text == "Answer 2" && !a.IsCorrect), Is.True, "Expected one of the answers to be 'Answer 2' and marked as incorrect.");
    }
}
