using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.BackOfficeApi.Features.Questions;

public class UpdateQuestion
{
    public class Command : IRequest<int>
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public QuestionType Type { get; set; }
        public QuestionCategory Category { get; set; }
        public IEnumerable<AnswerRequest> Answers { get; set; } = new List<AnswerRequest>();
    }

    public class AnswerRequest
    {
        public string Text { get; set; } = string.Empty;
        public bool IsCorrect { get; set; }
    }

    public class RequestHandler : IRequestHandler<Command, int>
    {
        private readonly IRepository<Question> _questionRepository;

        public RequestHandler(IRepository<Question> questionRepository)
        {
            _questionRepository = questionRepository;
        }

        public async Task<int> Handle(Command request, CancellationToken cancellationToken)
        {

            var existingQuestion = await _questionRepository.GetById(request.Id); //imas id od answers !!!!!!!!
            if (existingQuestion == null)
            {
                throw new KeyNotFoundException($"Question with ID {request.Id} not found.");
            }

            existingQuestion.Text = request.Text;
            existingQuestion.Type = request.Type;
            existingQuestion.Category = request.Category;

            existingQuestion.Answers = Enumerable.Empty<Answer>();
            List<Answer> answersList = existingQuestion.Answers.ToList();

            //svaki answer get by id pa onda save changes 
            answersList.AddRange(request.Answers.Select(a => new Answer
            {
                Text = a.Text,
                IsCorrect = a.IsCorrect
            }).ToList());

            existingQuestion.Answers = answersList;

            await _questionRepository.SaveChanges();

            return existingQuestion.Id;
        }
    }
}
