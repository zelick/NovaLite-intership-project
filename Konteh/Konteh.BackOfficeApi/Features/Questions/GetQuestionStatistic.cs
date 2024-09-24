using Konteh.Domain;
using Konteh.Infrastructure.Exceptions;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.BackOfficeApi.Features.Questions;

public class GetQuestionStatistic
{
    public class Query : IRequest<double>
    {
        public int QuestionId { get; set; }
    }
    public class RequestHandler : IRequestHandler<Query, double>
    {
        private readonly IRepository<Question> _questionRepository;
        private readonly IExamRepository _examRepository;
        public RequestHandler(IRepository<Question> repository, IExamRepository examRepository)
        {
            _questionRepository = repository;
            _examRepository = examRepository;
        }

        public async Task<double> Handle(Query request, CancellationToken cancellationToken)
        {
            var question = _questionRepository.GetById(request.QuestionId);
            if (question != null)
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
                return 0;
            }
            else
            {
                return correctAttempts / totalAttempts * 100;
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
