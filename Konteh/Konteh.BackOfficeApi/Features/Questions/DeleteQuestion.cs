using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;
using System.Runtime.CompilerServices;

namespace Konteh.BackOfficeApi.Features.Questions;

public static class DeleteQuestion
{
    public class Command : IRequest
    {
        public int Id { get; set; }
    }
    public class RequestHandler : IRequestHandler<Command>
    {
        private readonly IRepository<Question> _questionRepository;
        public RequestHandler(IRepository<Question> repository)
        {
            _questionRepository = repository;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var question = await _questionRepository.GetById(request.Id);

            if (question == null)
            {
                throw new KeyNotFoundException($"Question with ID {request.Id} not found.");
            }
            _questionRepository.Delete(question);
            await _questionRepository.SaveChanges();
        }
    }
}
