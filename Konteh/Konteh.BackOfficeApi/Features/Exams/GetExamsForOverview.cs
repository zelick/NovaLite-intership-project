using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.BackOfficeApi.Features.Exams;

public static class GetExamsForOverview
{
    public class Query : IRequest<Response>
    {
        public string? Text { get; set; } = string.Empty;
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
    public class Response
    {
        public IEnumerable<ExamResponse> Exams { get; set; } = new List<ExamResponse>();
        public int Length { get; set; }
    }
    public class ExamResponse
    {
        public int Id { get; set; }
        public string CandidateName { get; set; } = string.Empty;
        public string Score { get; set; } = string.Empty;
        public string ExamStatus { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
    }

    public class RequestHandler : IRequestHandler<Query, Response>
    {
        private readonly IRepository<Exam> _examRepository;
        public RequestHandler(IRepository<Exam> examRepository)
        {
            _examRepository = examRepository;
        }

        public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
        {
            string searchText = "";
            if (request.Text != null)
            {
                searchText = request.Text.Trim().ToLower();
            }

            var query = _examRepository.Search(exam =>
                exam.Candidate.Name.Contains(searchText) ||
                exam.Candidate.Surname.Contains(searchText));

            var length = query.Count();

            var exams = query
                .OrderByDescending(exam => exam.StartTime)
                .Skip(request.Page * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var examResult = exams.Select(exam => new ExamResponse
            {
                Id = exam.Id,
                CandidateName = $"{exam.Candidate.Name} {exam.Candidate.Surname}",
                Score = $"{CountRightAnswers(exam)}/{exam.ExamQuestions.Count}",
                ExamStatus = exam.Status.ToString(),
                StartTime = exam.StartTime
            });

            var response = new Response
            {
                Exams = examResult,
                Length = length
            };

            return response;
        }
        private int CountRightAnswers(Exam exam)
        {
            var rightAnswerCount = 0;

            foreach (var eq in exam.ExamQuestions)
            {
                var rightAnswers = eq.Question.Answers.Where(answer => answer.IsCorrect).ToList();

                var selectedAnswers = eq.SelectedAnswers;
                if (selectedAnswers.Count() == 0)
                {
                    continue;
                }

                if (AreSelectedAnswersCorrect(selectedAnswers, rightAnswers))
                {
                    rightAnswerCount++;
                }
            }

            return rightAnswerCount;
        }

        private bool AreSelectedAnswersCorrect(IEnumerable<Answer> selectedAnswers, List<Answer> rightAnswers)
        {
            return selectedAnswers.Count() == rightAnswers.Count && !selectedAnswers.Except(rightAnswers).Any() && !rightAnswers.Except(selectedAnswers).Any();
        }

    }
}




