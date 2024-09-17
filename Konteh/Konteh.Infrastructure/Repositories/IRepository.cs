using System.Linq.Expressions;

namespace Konteh.Infrastructure.Repositories;
public interface IRepository<T>
{
    Task<List<T>> GetAll();
    Task<T?> GetById(int id);
    void Add(T entity);
    void Delete(T entity);
    Task SaveChanges();
    Task<IEnumerable<T>> Search(Expression<Func<T, bool>> predicate);
    Tuple<IEnumerable<T>, int> SearchAndPaged(Expression<Func<T, bool>> predicate, int page, int pagesize);
    IEnumerable<T> GetPaged(int page, int pagesize);
}
