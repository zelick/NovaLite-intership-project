using Konteh.Domain;
using Konteh.FrontOfficeApi.Dtos;
using Konteh.Infrastructure.Exceptions;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.FrontOfficeApi.Features.Exams;

public static class SubmitExam
{
    public class Command : IRequest
    {
        public int Id { get; set; }
        public IEnumerable<ExamQuestionDto> ExamQuestions { get; set; } = new List<ExamQuestionDto>();
    }

    public class ExamQuestionDto
    {
        public int Id { get; set; }
        public IEnumerable<AnswerDto> SelectedAnswers { get; set; } = new List<AnswerDto>();
    }

    public class RequestHandler : IRequestHandler<Command>
    {
        private readonly IRepository<ExamQuestion> _examQuestionRepository;
        private readonly IRepository<Exam> _examRepository;

        public RequestHandler(IRepository<ExamQuestion> examQuestionRepository, IRepository<Exam> examRepository)
        {
            _examQuestionRepository = examQuestionRepository;
            _examRepository = examRepository;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var exam = await _examRepository.GetById(request.Id);
            if (exam == null)
                throw new NotFoundException();

            var selectedAnswersIds = request.ExamQuestions.ToDictionary(e => e.Id, e => e.SelectedAnswers.Select(a => a.AnswerId).ToHashSet());

            var examQuestions = _examQuestionRepository.GetByIds(request.ExamQuestions.Select(e => e.Id).ToList());
            if (!examQuestions.Any())
                throw new NotFoundException();

            foreach (var examQuestion in examQuestions)
            {
                var answersIds = selectedAnswersIds[examQuestion.Id];
                examQuestion.SelectedAnswers = examQuestion.Question.Answers.Where(a => answersIds.Contains(a.Id)).ToList();
            }
            await _examQuestionRepository.SaveChanges();

            exam.Status = ExamStatus.Completed;
            exam.EndTime = DateTime.UtcNow;
            await _examRepository.SaveChanges();
        }
    }
}
