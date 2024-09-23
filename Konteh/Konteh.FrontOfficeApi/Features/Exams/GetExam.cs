using Konteh.Domain;
using Konteh.FrontOfficeApi.Dtos;
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
        public int Id { get; set; }  //id exq treba ti kasnije da bi update 
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

    public class RequestHandler : IRequestHandler<Query, IEnumerable<Response>>
    {
        private readonly IRepository<Exam> _examRepository;
        private readonly IRepository<Question> _questionRepository;
        private readonly IRepository<ExamQuestion> _examQuestionRepository;

        public RequestHandler(IRepository<Exam> examRepository, IRepository<Question> questionRepository, IRepository<ExamQuestion> examQuestionRepository)
        {
            _examRepository = examRepository;
            _questionRepository = questionRepository;
            _examQuestionRepository = examQuestionRepository;
        }

        public async Task<IEnumerable<Response>> Handle(Query request, CancellationToken cancellationToken)
        {
            var exam = await _examRepository.GetById(request.Id);
            if (exam == null)
                throw new KeyNotFoundException($"Exam with ID {request.Id} not found.");
            var examQuestions = exam.ExamQuestions;

            var responseList = new List<Response>();

            foreach (var examQuestion in examQuestions)
            {
                var response = new Response
                {
                    Id = examQuestion.Id,
                    QuestionDto = new QuestionDto
                    {
                        Id = examQuestion.Question.Id,
                        Text = examQuestion.Question.Text,
                        Category = examQuestion.Question.Category,
                        Type = examQuestion.Question.Type,
                        Answers = examQuestion.Question.Answers.Select(a => new AnswerDto { AnswerId = a.Id, AnswerText = a.Text }).ToList()
                    }

                };
                response.SelectedAnswers = examQuestion.SelectedAnswers.Select(a => new AnswerDto { AnswerId = a.Id, AnswerText = a.Text }).ToList();
                responseList.Add(response);

            }
            return responseList;
        }
    }

}
