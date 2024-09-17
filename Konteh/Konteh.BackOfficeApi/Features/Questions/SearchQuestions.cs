using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using System.Security.Principal;

namespace Konteh.BackOfficeApi.Features.Questions;

public static class SearchQuestions
{
    public class Query : IRequest<SearchResponse>
    {
        public string Text { get; set; } = string.Empty;
        public int Page {  get; set; }
        public int PageSize { get; set; }
    }

    public class Response
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public QuestionCategory Category { get; set; }
        public QuestionType Type { get; set; }
    }

    public class SearchResponse
    {
        public IEnumerable<Response> Questions { get; set; } = new List<Response>();
        public int Length { get; set; }
    }

    public class RequestHandler : IRequestHandler<Query, SearchResponse>
    {
        private readonly IRepository<Question> _questionsRepository;
        public int Length { get; set; }
        public RequestHandler(IRepository<Question> questionsRepository)
        {
            _questionsRepository = questionsRepository;
        }

        public async Task<SearchResponse> Handle(Query request, CancellationToken cancellationToken)
        {
            var questions = new List<Question>();
            int length = 0;
            if (string.IsNullOrEmpty(request.Text))
            {
                var query = await _questionsRepository.Search(a => !a.IsDeleted);
                length = query.Count();
                questions = query.Skip(request.Page * request.PageSize).Take(request.PageSize).ToList();
            }
            else
            {
                var query = await _questionsRepository.Search(a => !a.IsDeleted && a.Text.Contains(request.Text));
                length = query.Count();
                questions = query.Skip(request.Page * request.PageSize).Take(request.PageSize).ToList();
            }
                

            var resposnes = questions.Select(q => new Response
            {
                Id = q.Id,
                Text = q.Text,
                Category = q.Category,
                Type = q.Type,
            });
            return new SearchResponse { Questions = resposnes, Length = length};
        }
    }
}
