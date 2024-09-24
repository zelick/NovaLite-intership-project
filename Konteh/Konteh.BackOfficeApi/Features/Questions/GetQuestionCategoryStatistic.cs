using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.BackOfficeApi.Features.Questions;

public static class GetQuestionCategoryStatistic
{
    public class Query : IRequest<QuestionCategoryStatisticDto[]>;

    public class QuestionCategoryStatisticDto
    {
        public string CategoryName { get; set; } = string.Empty;
        public double CorrectPercentage { get; set; }
        public double IncorrectPercentage { get; set; }
    }

    public class RequestHandler : IRequestHandler<Query, QuestionCategoryStatisticDto[]>
    {
        private readonly IRepository<Question> _questionRepository;
        private readonly IExamRepository _examRepository;

        public RequestHandler(IRepository<Question> repository, IExamRepository examRepository)
        {
            _questionRepository = repository;
            _examRepository = examRepository;
        }

        public async Task<QuestionCategoryStatisticDto[]> Handle(Query request, CancellationToken cancellationToken)
        {

            var questions = await _questionRepository.GetAll();

            var groupedQuestions = questions.GroupBy(q => q.Category);

            var categoryStatistics = new List<QuestionCategoryStatisticDto>();

            foreach (var group in groupedQuestions)
            {
                var totalAttempts = 0;
                var correctAttempts = 0;
                var questionIds = group.Select(q => q.Id).ToList();
                var exams = await _examRepository.GetByQuestions(questionIds);

                foreach (var exam in exams)
                {
                    var examQuestions = exam.ExamQuestions.Where(eq => group.Any(q => q.Id == eq.Question.Id));

                    foreach (var examQuestion in examQuestions)
                    {
                        totalAttempts++;

                        if (IsCorrect(examQuestion))
                        {
                            correctAttempts++;
                        }
                    }
                }
                double correctPercentage = 0;
                double incorrectPercentage = 0;

                if (totalAttempts > 0)
                {
                    correctAttempts = correctAttempts / totalAttempts * 100;
                    incorrectPercentage = 100 - correctAttempts;
                }

                categoryStatistics.Add(new QuestionCategoryStatisticDto
                {
                    CategoryName = group.Key.ToString(),
                    CorrectPercentage = correctPercentage,
                    IncorrectPercentage = incorrectPercentage
                });

            }

            return categoryStatistics.ToArray();
        }

        private bool IsCorrect(ExamQuestion examQuestion)
        {
            var correctAnswers = examQuestion.Question.Answers.Where(a => a.IsCorrect).ToList();
            return !examQuestion.SelectedAnswers.Except(correctAnswers).Any() &&
                   !correctAnswers.Except(examQuestion.SelectedAnswers).Any();
        }
    }
}
