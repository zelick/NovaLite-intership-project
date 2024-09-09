using System.Linq.Expressions;

namespace Konteh.Infrastructure.Repositories;
public interface IRepository<T>
{
    List<T> GetAll();
    T? GetById(int id);
    void Add(T entity);
    void Delete(T entity);
    Task SaveChangesAsync();
    IEnumerable<T> Search(Expression<Func<T, bool>> predicate);
}
