using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Konteh.Infrastructure.Repositories;
public abstract class BaseRepository<T> : IRepository<T> where T : class
{
    protected readonly KontehDbContext _context;
    protected readonly DbSet<T> _dbSet;

    protected BaseRepository(KontehDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }
    public void Add(T entity) => _dbSet.Add(entity);

    public void Delete(T entity) => _dbSet.Remove(entity);

    public async Task<List<T>> GetAll() => await _dbSet.ToListAsync();

    public T? GetById(int id) => _dbSet.Find(id);

    public async Task SaveChanges() => await _context.SaveChangesAsync();

    public async Task<IEnumerable<T>> Search(Expression<Func<T, bool>> predicate) => await _dbSet.Where(predicate).ToListAsync();
}
