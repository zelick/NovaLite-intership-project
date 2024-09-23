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
            List<Exam> query;
            int length;

            if (!string.IsNullOrEmpty(request.Text))
            {
                string searchText = request.Text.Trim().ToLower();

                query = _examRepository.Search(exam =>
                    exam.Candidate.Name.Contains(searchText) ||
                    exam.Candidate.Surname.Contains(searchText)).ToList();

                length = query.Count();

                query = query
                    .Skip(request.Page * request.PageSize)
                    .Take(request.PageSize)
                    .OrderByDescending(exam => exam.StartTime).ToList();
            }
            else
            {
                query = _examRepository.GetPaged(request.Page, request.PageSize)
                    .OrderByDescending(exam => exam.StartTime).ToList();

                length = await _examRepository.CountAsync();
            }

            var exams = query;
            var examResult = exams.Select(exam => new ExamResponse
            {
                Id = exam.Id,
                CandidateName = $"{exam.Candidate.Name} {exam.Candidate.Surname}",
                Score = $"{exam.ExamQuestions.Count(eq => eq.SelectedAnswers.Any() &&
                                                          eq.SelectedAnswers.All(sa => sa.IsCorrect))}/{exam.ExamQuestions.Count}",
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

    }
}




