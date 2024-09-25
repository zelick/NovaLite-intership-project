using Konteh.Domain;
using Konteh.Infrastructure.Exceptions;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.FrontOfficeApi.Features.Exams;

public static class GetExam
{
    public class Query : IRequest<IEnumerable<Response>>
    {
        public int Id { get; set; }
    }

    public class Response
    {
        public int Id { get; set; }
        public QuestionDto QuestionDto { get; set; } = new QuestionDto();
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

    public class ExamQuestionDto
    {
        public int QuestionId { get; set; }
        public string QuestionText { get; set; } = string.Empty;
        public List<AnswerDto> SelectedAnswers { get; set; } = new();
    }

    public class AnswerDto
    {
        public int AnswerId { get; set; }
        public string AnswerText { get; set; } = string.Empty;
    }


    public class RequestHandler : IRequestHandler<Query, IEnumerable<Response>>
    {
        private readonly IRepository<Exam> _examRepository;
        private readonly IRepository<ExamQuestion> _examQuestionRepository;

        public RequestHandler(IRepository<Exam> examRepository, IRepository<ExamQuestion> examQuestionRepository)
        {
            _examRepository = examRepository;
            _examQuestionRepository = examQuestionRepository;
        }

        public async Task<IEnumerable<Response>> Handle(Query request, CancellationToken cancellationToken)
        {
            var exam = await _examRepository.GetById(request.Id);
            if (exam == null)
                throw new NotFoundException();

            var responseList = exam.ExamQuestions.Select(examQuestion => new Response
            {
                Id = examQuestion.Id,
                QuestionDto = new QuestionDto
                {
                    Id = examQuestion.Question.Id,
                    Text = examQuestion.Question.Text,
                    Category = examQuestion.Question.Category,
                    Type = examQuestion.Question.Type,
                    Answers = examQuestion.Question.Answers.Select(a => new AnswerDto
                    {
                        AnswerId = a.Id,
                        AnswerText = a.Text
                    }).ToList()
                },
                SelectedAnswers = examQuestion.SelectedAnswers.Select(a => new AnswerDto
                {
                    AnswerId = a.Id,
                    AnswerText = a.Text
                }).ToList()
            }).ToList();

            return responseList;
        }
    }

}
