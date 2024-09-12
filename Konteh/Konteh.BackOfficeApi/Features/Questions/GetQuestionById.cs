using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.BackOfficeApi.Features.Questions;

public class GetQuestionById
{
    public class Query : IRequest<Question>
    {
        public int Id { get; set; }
    }

    public class RequestHandler : IRequestHandler<Query, Question>
    {
        public readonly IRepository<Question> _questionRepository;
        public RequestHandler(IRepository<Question> questionRepository)
        {
            _questionRepository = questionRepository;
        }
        public async Task<Question> Handle(Query request, CancellationToken cancellationToken)
        {
            var response = new Question();

            if (request.Id <= 0)
            {
                return response;
            }

            var question = await _questionRepository.GetById(request.Id);

            return question ?? response;
        }
    }
}
