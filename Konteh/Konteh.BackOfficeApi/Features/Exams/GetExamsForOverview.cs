using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.BackOfficeApi.Features.Exams;

public static class GetExamsForOverview
{
    public class Query : IRequest<Response>
    {
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
        public int totalNumberOfQuestions { get; set; }
        public int correctAnswersCount { get; set; }
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
            var exams = _examRepository.GetPaged(request.Page, request.PageSize).ToList();
            var allExams = await _examRepository.GetAll();

            var length = allExams.Count();

            var examResult = exams.Select(exam => new ExamResponse
            {
                Id = exam.Id,
                Candidate = new CandidateInformation
                {
                    Email = exam.Candidate.Email,
                    Name = exam.Candidate.Name,
                    Surname = exam.Candidate.Surname
                },
                totalNumberOfQuestions = exam.ExamQuestions.Count,
                correctAnswersCount = exam.ExamQuestions.Count(eq => eq.SelectedAnswers.Any() &&
                                                                     eq.SelectedAnswers.All(sa => sa.IsCorrect))
            });
            var response = new Response { Exams = examResult, Length = length };
            return response;
        }
    }
}




