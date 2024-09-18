namespace Konteh.Infrastructure.Repositories;
using Konteh.Domain;

public class ExamQuestionRepository : BaseRepository<ExamQuestion>
{
    public ExamQuestionRepository(KontehDbContext context) : base(context)
    {

    }
}
