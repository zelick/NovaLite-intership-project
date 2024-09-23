using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;

namespace Konteh.BackOfficeApi.Features.Questions;

public static class QuestionCategoryStatistic
{
    public class Query : IRequest<double>
    {

    }

    public class RequestHandler : IRequestHandler<Query, double>
    {
        private readonly IRepository<Question> _questionRepository;
        public RequestHandler(IRepository<Question> repository)
        {
            _questionRepository = repository;
        }

        public async Task<double> Handle(Query request, CancellationToken cancellationToken)
        {
            var questions = await _questionRepository.GetAllByCategory(QuestionCategory.Oop);
            var percentage = questions.Count;
            return percentage;
        }
    }
}
