namespace Konteh.BackOfficeApi.Features.Questions;

using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

public static class CreateQuestion
{
    public class Command : IRequest<Unit>
    {
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

    public class RequestHandler : IRequestHandler<Command, Unit>
    {
        private readonly IRepository<Question> _questionRepository;

        public RequestHandler(IRepository<Question> questionRepository)
        {
            _questionRepository = questionRepository;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var newQuestion = new Question
            {
                Text = request.Text,
                Category = request.Category,
                Answers = request.Answers.Select(a => new Answer
                {
                    Text = a.Text,
                    IsCorrect = a.IsCorrect
                }).ToList()
            };
            _questionRepository.Add(newQuestion);
            await _questionRepository.SaveChanges();

            return Unit.Value;
        }
    }

}
