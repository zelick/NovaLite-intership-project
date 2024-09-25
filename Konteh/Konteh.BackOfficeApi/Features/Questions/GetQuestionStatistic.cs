using Konteh.Domain;
using Konteh.Infrastructure.Exceptions;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.BackOfficeApi.Features.Questions;

public class GetQuestionStatistic
{
    public class Query : IRequest<Response>
    {
        public int QuestionId { get; set; }
    }

    public class Response
    {
        public double Percentage { get; set; }
        public string Text { get; set; } = String.Empty;
    }
    public class RequestHandler : IRequestHandler<Query, Response>
    {
        private readonly IRepository<Question> _questionRepository;
        private readonly IExamRepository _examRepository;
        public RequestHandler(IRepository<Question> repository, IExamRepository examRepository)
        {
            _questionRepository = repository;
            _examRepository = examRepository;
        }

        public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
        {
            var question = _questionRepository.GetById(request.QuestionId).Result;
            if (question == null)
            {
                throw new NotFoundException();
            }

            var examsForQuestion = await _examRepository.GetByQuestion(request.QuestionId);

            int totalAttempts = 0;
            int correctAttempts = 0;


            foreach (var exam in examsForQuestion)
            {
                var examQuestion = exam.ExamQuestions.FirstOrDefault(eq => eq.Question.Id == request.QuestionId);
                if (examQuestion != null)
                {
                    totalAttempts++;

                    if (IsCorrect(examQuestion))
                    {
                        correctAttempts++;
                    }
                }
            }

            if (totalAttempts <= 0)
            {
                return new Response { Percentage = 0, Text = question!.Text };
            }
            else
            {
                var res = new Response { Percentage = Math.Round((double)correctAttempts / totalAttempts * 100, 2), Text = question!.Text };
                return res;
            }
        }


        private bool IsCorrect(ExamQuestion examQuestion)
        {
            var correctAnswers = examQuestion.Question.Answers.Where(a => a.IsCorrect).ToList();
            return !examQuestion.SelectedAnswers.Except(correctAnswers).Any() &&
                   !correctAnswers.Except(examQuestion.SelectedAnswers).Any();
        }
    }
}
