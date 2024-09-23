using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.BackOfficeApi.Features.Exams;

public static class GetExamsForOverview
{
    public class Query : IRequest<Response>
    {
        public string Text { get; set; } = string.Empty;
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
        public CandidateInformation Candidate { get; set; } = new CandidateInformation();
        public int TotalNumberOfQuestions { get; set; }
        public int CorrectAnswersCount { get; set; }
        public string ExamStatus { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
    }

    public class CandidateInformation
    {
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
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
            IQueryable<Exam> query;
            int length;

            if (!string.IsNullOrEmpty(request.Text))
            {
                string searchText = request.Text.Trim().ToLower();

                query = _examRepository.Search(exam =>
                    exam.Candidate.Name.Contains(searchText) ||
                    exam.Candidate.Surname.Contains(searchText));

                length = query.Count();

                query = query
                    .Skip(request.Page * request.PageSize)
                    .Take(request.PageSize)
                    .OrderByDescending(exam => exam.StartTime);
            }
            else
            {
                query = _examRepository.GetPaged(request.Page, request.PageSize)
                    .OrderByDescending(exam => exam.StartTime)
                    .AsQueryable();

                var allExams = await _examRepository.GetAll();
                length = allExams.Count();
            }

            var exams = query.ToList();
            var examResult = exams.Select(exam => new ExamResponse
            {
                Id = exam.Id,
                Candidate = new CandidateInformation
                {
                    Email = exam.Candidate.Email,
                    Name = exam.Candidate.Name,
                    Surname = exam.Candidate.Surname
                },
                TotalNumberOfQuestions = exam.ExamQuestions.Count,
                CorrectAnswersCount = exam.ExamQuestions.Count(eq => eq.SelectedAnswers.Any() &&
                                                                     eq.SelectedAnswers.All(sa => sa.IsCorrect)),
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




