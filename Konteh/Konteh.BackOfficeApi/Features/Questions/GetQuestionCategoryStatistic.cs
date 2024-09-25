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
        private readonly IRepository<ExamQuestion> _examQuestionRepository;
        private readonly IExamRepository _examRepository;

        public RequestHandler(IRepository<Question> repository, IExamRepository examRepository, IRepository<ExamQuestion> examQuestionRepository)
        {
            _questionRepository = repository;
            _examRepository = examRepository;
            _examQuestionRepository = examQuestionRepository;
        }

        public async Task<QuestionCategoryStatisticDto[]> Handle(Query request, CancellationToken cancellationToken)
        {
            var categoryStatistics = new List<QuestionCategoryStatisticDto>();

            var examQuestions = await _examQuestionRepository.GetAll();
            var gropedExamQuestions = examQuestions.GroupBy(eq => eq.Question.Category);
            foreach (var group in gropedExamQuestions)
            {
                var totalAttempts = group.Count();
                var correctAttempts = 0;

                foreach (var examQuestion in group)
                {
                    if (examQuestion.IsCorrect())
                    {
                        correctAttempts++;
                    }
                }

                double correctPercentage = 0;
                double incorrectPercentage = 0;

                if (totalAttempts > 0)
                {
                    correctPercentage = Math.Round((double)correctAttempts / totalAttempts * 100, 2);
                    incorrectPercentage = Math.Round(100 - correctPercentage, 2);
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

    }
}
