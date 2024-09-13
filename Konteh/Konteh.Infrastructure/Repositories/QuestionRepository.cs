using Konteh.Domain;
using Microsoft.EntityFrameworkCore;

namespace Konteh.Infrastructure.Repositories;
public class QuestionRepository : BaseRepository<Question>
{
    public QuestionRepository(KontehDbContext context) : base(context)
    {
    }

    public override async Task<Question?> GetById(int id) => await _dbSet.Include(x => x.Answers).SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
    public override void Delete(Question entity) => entity.IsDeleted = true; // save change???
    public override async Task<List<Question>> GetAll() => await _dbSet.Where(a => !a.IsDeleted).ToListAsync();
}