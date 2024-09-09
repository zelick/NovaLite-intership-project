using Konteh.Domain;
using Microsoft.EntityFrameworkCore;

namespace Konteh.Infrastructure.Repositories;
public class QuestionRepository : BaseRepository<Question>
{
    public QuestionRepository(DbContext context) : base(context)
    {

    }
}
