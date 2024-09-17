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
            var questions = new Tuple<IEnumerable<Question>,int>(new List<Question>(), 0);
            if (request.Text.IsNullOrEmpty())           
                 questions = _questionsRepository.SearchAndPaged(a => !a.IsDeleted, request.Page, request.PageSize);
            else
                questions = _questionsRepository.SearchAndPaged(a => a.Text.Contains(request.Text) && !a.IsDeleted, request.Page, request.PageSize);

            var resposnes = questions.Item1.Select(q => new Response
            {
                Id = q.Id,
                Text = q.Text,
                Category = q.Category,
                Type = q.Type,
            });
            return new SearchResponse { Questions = resposnes, Length = questions.Item2};
        }
    }
}
