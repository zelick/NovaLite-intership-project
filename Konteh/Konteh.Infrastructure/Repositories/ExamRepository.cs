namespace Konteh.Infrastructure.Repositories;
using Konteh.Domain;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

public class ExamRepository : BaseRepository<Exam>
{
    public ExamRepository(KontehDbContext context) : base(context)
    {

    }
    public override async Task<Exam?> GetById(int id)
    {
        var exam = await _dbSet
        .Include(eq => eq.ExamQuestions)
           .ThenInclude(eq => eq.Question)
               .ThenInclude(q => q.Answers)
        .Include(x => x.ExamQuestions)
           .ThenInclude(eq => eq.SelectedAnswers)
        .SingleOrDefaultAsync(x => x.Id == id);

        return exam;
    }
}
