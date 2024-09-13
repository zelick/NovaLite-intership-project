using Konteh.Domain;

namespace Konteh.Infrastructure.Repositories;
public class AnswerRepository : BaseRepository<Answer>
{
    public AnswerRepository(KontehDbContext context) : base(context)
    {
    }
}
