using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using MediatR;
using System.Runtime.CompilerServices;

namespace Konteh.BackOfficeApi.Features.Questions
{
    public static class DeleteQuestion
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }
        public class CommandHandler : IRequestHandler<Command>
        {
            private readonly IRepository<Question> _questionRepository;
            private readonly IRepository<Answer> _answerRepository;
            public CommandHandler(IRepository<Question> repository, IRepository<Answer> answerRepository)
            {
                _questionRepository = repository;
                _answerRepository = answerRepository;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                Question question = await _questionRepository.GetById(request.Id);

                if (question == null)
                {
                    throw new KeyNotFoundException($"Question with ID {request.Id} not found.");
                }
                                
                await _answerRepository.SaveChanges();
                _questionRepository.Delete(question);
                await _questionRepository.SaveChanges();
            }
        }
    }
}
