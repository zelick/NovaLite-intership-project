using Konteh.Domain;

namespace Konteh.Infrastructure.Repositories;

public class ExamRepository : BaseRepository<Exam>
{
    public ExamRepository(KontehDbContext context) : base(context)
    {

    }
}
