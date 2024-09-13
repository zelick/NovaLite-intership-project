namespace Konteh.FrontOfficeApi.Features.Questions;
using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

public static class GenerateTestQuestions
{
    public class Query : IRequest<IEnumerable<Response>>;

    public class Response
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public QuestionCategory Category { get; set; }

    }


    public class RequestHandler : IRequestHandler<Query, IEnumerable<Response>>
    {
        private readonly IRepository<Question> _questionRepository;

        public RequestHandler(IRepository<Question> repository)
        {
            _questionRepository = repository;
        }

        public async Task<IEnumerable<Response>> Handle(Query request, CancellationToken cancellationToken)
        {
            var categories = Enum.GetValues(typeof(QuestionCategory)).Cast<QuestionCategory>();

            var questions = new List<Question>();

            foreach (var category in categories)
            {
                var questionsByCategory = await _questionRepository.Search(q => q.Category == category);

                var randomTwoQuestions = questionsByCategory
                    .OrderBy(r => Guid.NewGuid()) 
                    .Take(2)
                    .ToList();

                questions.AddRange(randomTwoQuestions);
            }

            return questions.Select(q => new Response
            {
                Id = q.Id,
                Text = q.Text,
                Category = q.Category
            });
        }
    }


}

