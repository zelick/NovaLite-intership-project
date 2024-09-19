namespace Konteh.Infrastructure.Repositories;
using Konteh.Domain;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

public class ExamRepository : BaseRepository<Exam>
{
    public ExamRepository(KontehDbContext context) : base(context)
    {

    }
    public override async Task<Exam> GetById(int id) => await _dbSet.Include(x => x.ExamQuestions).ThenInclude(eq => eq.Question).SingleOrDefaultAsync(x => x.Id == id);

}
