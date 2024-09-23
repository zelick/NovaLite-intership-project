using Konteh.Domain;
using Konteh.FrontOfficeApi.Dtos;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.FrontOfficeApi.Features.ExamQuestions;

public static class SaveExamQuestions
{
    public class Command : IRequest
    {
        public IEnumerable<ExamQuestionDto> ExamQuestions { get; set; } = new List<ExamQuestionDto>();
    }

    public class ExamQuestionDto
    {
        public int Id { get; set; }
        public QuestionDto QuestionDto { get; set; } = null!;
        public IEnumerable<AnswerDto> SelectedAnswers { get; set; } = new List<AnswerDto>();
    }

    public class QuestionDto
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public QuestionCategory Category { get; set; }
        public QuestionType Type { get; set; }
        public IList<AnswerDto> Answers { get; set; } = new List<AnswerDto>();
    }

    public class RequestHandler : IRequestHandler<Command>
    {
        private readonly IRepository<ExamQuestion> _examQuestionRepository;
        private readonly IRepository<Answer> _answerRepository;

        public RequestHandler(IRepository<ExamQuestion> examQuestionRepository, IRepository<Answer> answerRepository)
        {
            _examQuestionRepository = examQuestionRepository;
            _answerRepository = answerRepository;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            foreach (var examQuestionDto in request.ExamQuestions)
            {
                var examQuestion = await _examQuestionRepository.GetById(examQuestionDto.Id);
                if (examQuestion == null)
                    continue;
                examQuestion.SelectedAnswers = await GetAnswers(examQuestionDto.SelectedAnswers);
                await _examQuestionRepository.SaveChanges();
            }
        }
        private async Task<IEnumerable<Answer>> GetAnswers(IEnumerable<AnswerDto> answerDtos)
        {
            var answers = new List<Answer>();
            foreach (var answerDto in answerDtos)
            {
                var answer = await _answerRepository.GetById(answerDto.AnswerId);
                if (answer != null)
                    answers.Add(answer);
            }
            return answers;
        }
    }
}
