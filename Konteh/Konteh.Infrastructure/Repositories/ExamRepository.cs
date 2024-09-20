namespace Konteh.Infrastructure.Repositories;
using Konteh.Domain;
using Microsoft.EntityFrameworkCore;

public class ExamRepository : BaseRepository<Exam>
{
    public ExamRepository(KontehDbContext context) : base(context)
    {

    }
    public override IEnumerable<Exam> GetPaged(int page, int pageSize)
    {
        IQueryable<Exam> queryList = _dbSet
            .Include(e => e.ExamQuestions)
            .ThenInclude(eq => eq.Question)
            .Include(e => e.Candidate)
            .Skip(page * pageSize)
            .Take(pageSize);

        return queryList.ToList();
    }
}
