using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.BackOfficeApi.Features.Questions;

public class UpdateQuestion
{
    public class Command : IRequest<Question>
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public QuestionType Type { get; set; }
        public QuestionCategory Category { get; set; }
        public IEnumerable<AnswerRequest> Answers { get; set; } = new List<AnswerRequest>();
    }

    public class AnswerRequest
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public bool IsCorrect { get; set; }
    }

    public class RequestHandler : IRequestHandler<Command, Question>
    {
        private readonly IRepository<Question> _questionRepository;
        private readonly IRepository<Answer> _answerRepository;

        public RequestHandler(IRepository<Question> questionRepository, IRepository<Answer> answerRepository)
        {
            _questionRepository = questionRepository;
            _answerRepository = answerRepository;
        }

        public async Task<Question> Handle(Command request, CancellationToken cancellationToken)
        {

            var existingQuestion = await _questionRepository.GetById(request.Id);

            if (existingQuestion == null)
            {
                throw new KeyNotFoundException($"Question with ID {request.Id} not found.");
            }

            existingQuestion.Text = request.Text;
            existingQuestion.Type = request.Type;
            existingQuestion.Category = request.Category;

            List<Answer> answersList = existingQuestion.Answers.ToList();

            foreach (var requestAnswer in request.Answers)
            {
                var existingAnswer = answersList.FirstOrDefault(a => a.Id == requestAnswer.Id);

                if (existingAnswer != null)
                {
                    existingAnswer.Text = requestAnswer.Text;
                    existingAnswer.IsCorrect = requestAnswer.IsCorrect;
                    answersList.RemoveAll(a => a.Id == existingAnswer.Id);
                    answersList.Add(existingAnswer);
                }
            }
            existingQuestion.Answers = answersList;

            await _questionRepository.SaveChanges();

            return existingQuestion;
        }
    }
}
