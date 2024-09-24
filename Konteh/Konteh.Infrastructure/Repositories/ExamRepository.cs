namespace Konteh.Infrastructure.Repositories;
using Konteh.Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

public class ExamRepository : BaseRepository<Exam>
{
    public ExamRepository(KontehDbContext context) : base(context)
    {

    }
    public override IQueryable<Exam> Search(Expression<Func<Exam, bool>> predicate)
    {
        return _dbSet
            .Include(e => e.ExamQuestions)
                .ThenInclude(eq => eq.Question)
                    .ThenInclude(q => q.Answers)
            .Include(e => e.Candidate)
            .Where(predicate);
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
