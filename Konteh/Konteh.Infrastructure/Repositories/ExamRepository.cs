namespace Konteh.Infrastructure.Repositories;
using Konteh.Domain;
public class ExamRepository : BaseRepository<Exam>
{
    public ExamRepository(KontehDbContext context) : base(context)
    {

    }
}
