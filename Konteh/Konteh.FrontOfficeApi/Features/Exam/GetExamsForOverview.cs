using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.FrontOfficeApi.Features.Exams;

public static class GetExamsForOverview
{
    public class Query : IRequest<IEnumerable<Response>>
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
    public class Response
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

    public class RequestHandler : IRequestHandler<Query, IEnumerable<Response>>
    {
        private readonly IRepository<Exam> _examRepository;
        public RequestHandler(IRepository<Exam> examRepository)
        {
            _examRepository = examRepository;
        }

        public Task<IEnumerable<Response>> Handle(Query request, CancellationToken cancellationToken)
        {
            var exams = _examRepository.GetPaged(request.Page, request.PageSize);

            var result = exams.Select(exam => new Response
            {
                Id = exam.Id,
                Candidate = new CandidateInformation
                {
                    Email = exam.Candidate.Email,
                    Name = exam.Candidate.Name,
                    Surname = exam.Candidate.Surname
                },
                totalNumberOfQuestions = exam.ExamQuestions.Count,
                correctAnswersCount = exam.ExamQuestions.Count(eq => eq.SelectedAnswers.All(a => a.IsCorrect))
            });

            return Task.FromResult(result);
        }
    }


}




