using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.BackOfficeApi.Features.Questions
{
    public class GetPagedQuestions
    {
        public class Query : IRequest<IEnumerable<Response>>
        {
            public int Page { get; set; }
            public int PageSize { get; set; }
        }

        public class Response()
        {
            public int Id { get; set; }
            public string Text { get; set; } = string.Empty;
            public QuestionCategory Category { get; set; }
            public QuestionType Type { get; set; }
            
        }

        public class RequestHandler : IRequestHandler<Query, IEnumerable<Response>>
        {
            private readonly IRepository<Question> _questionsRepository;

            public RequestHandler(IRepository<Question> questionsRepository)
            {
                _questionsRepository = questionsRepository;
            }

            public async Task<IEnumerable<Response>> Handle(Query request, CancellationToken cancellationToken)
            {
                var questions = await _questionsRepository.GetAll();
                int totalPages = (int) Math.Ceiling((decimal)questions.Count / request.PageSize);
                return questions.Skip((request.Page-1)*request.PageSize).Take(request.PageSize).Select(q => new Response
                {
                    Id = q.Id,
                    Text = q.Text,
                    Category = q.Category,
                    Type = q.Type
                });
            }
        }
    }
}
