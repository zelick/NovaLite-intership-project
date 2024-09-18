namespace Konteh.Infrastructure.Repositories;
using Konteh.Domain;

public class QuestionRepository : BaseRepository<Question>
{
    public QuestionRepository(KontehDbContext context) : base(context)
    {

    }
}
