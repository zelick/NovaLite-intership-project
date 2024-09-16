using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.BackOfficeApi.Features.Questions;

public static class AddQuestion
{
    public class Command : IRequest<Unit>
    {
        public int? Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public QuestionType Type { get; set; }
        public QuestionCategory Category { get; set; }
        public IEnumerable<AnswerRequest> Answers { get; set; } = new List<AnswerRequest>();
    }

    public class AnswerRequest
    {
        public int? Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public bool IsCorrect { get; set; }
    }

    public class RequestHandler : IRequestHandler<Command, Unit>
    {
        private readonly IRepository<Question> _questionRepository;
        private readonly IRepository<Answer> _answerRepository;

        public RequestHandler(IRepository<Question> questionRepository, IRepository<Answer> answerRepository)
        {
            _questionRepository = questionRepository;
            _answerRepository = answerRepository;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            if (!request.Id.HasValue)
            {
                await CreateQuestion(request);
            }
            else
            {
                await UpdateQuestion(request);
            }
            return Unit.Value;
        }

        private async Task CreateQuestion(Command request)
        {
            var newQuestion = new Question
            {
                Text = request.Text,
                Type = request.Type,
                Category = request.Category,
                Answers = request.Answers.Select(a => new Answer
                {
                    Text = a.Text,
                    IsCorrect = a.IsCorrect
                }).ToList()
            };
            _questionRepository.Add(newQuestion);
            await _questionRepository.SaveChanges();
        }

        private async Task UpdateQuestion(Command request)
        {
            var existingQuestion = new Question();

            if (request.Id != null)
            {
                existingQuestion = await _questionRepository.GetById(request.Id.Value);
            }

            if (existingQuestion == null)
            {
                throw new KeyNotFoundException($"Question with ID {request.Id} not found.");
            }

            existingQuestion.Text = request.Text;
            existingQuestion.Type = request.Type;
            existingQuestion.Category = request.Category;

            var answersList = existingQuestion.Answers.ToList();

            var requestAnswerIds = request.Answers.Select(a => a.Id).ToList(); ;
            var answersToRemove = answersList.Where(a => !requestAnswerIds.Contains(a.Id)).ToList();
            foreach (var answer in answersToRemove)
            {
                _answerRepository.Delete(answer);
                await _answerRepository.SaveChanges();
                answersList.Remove(answer);
            }

            foreach (var requestAnswer in request.Answers)
            {
                var existingAnswer = answersList.FirstOrDefault(a => a.Id == requestAnswer.Id);

                if (existingAnswer != null)
                {
                    existingAnswer.Text = requestAnswer.Text;
                    existingAnswer.IsCorrect = requestAnswer.IsCorrect;
                }
                else
                {
                    var newAnswer = new Answer
                    {
                        Text = requestAnswer.Text,
                        IsCorrect = requestAnswer.IsCorrect
                    };
                    answersList.Add(newAnswer);
                }
            }
            existingQuestion.Answers = answersList;
            await _questionRepository.SaveChanges();
        }
    }

}
