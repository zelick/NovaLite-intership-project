using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Konteh.Infrastructure.Repositories;
public abstract class BaseRepository<T> : IRepository<T> where T : class
{
    protected readonly DbContext _context;
    protected readonly DbSet<T> _dbSet;

    protected BaseRepository(DbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }
    public void Add(T entity)
    {
        _dbSet.Add(entity);
    }

    public void Delete(T entity)
    {
        _dbSet.Remove(entity);
    }

    public List<T> GetAll()
    {
        return _dbSet.ToList();
    }

    public T? GetById(int id)
    {
        return _dbSet.Find(id);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public IEnumerable<T> Search(Expression<Func<T, bool>> predicate)
    {
        return _dbSet.Where(predicate).ToList();
    }
}
