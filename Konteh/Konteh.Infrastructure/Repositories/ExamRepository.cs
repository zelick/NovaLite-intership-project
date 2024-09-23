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
        var exam = await _dbSet.Include(x => x.ExamQuestions).ThenInclude(eq => eq.Question).ThenInclude(eq => eq.Answers).SingleOrDefaultAsync(x => x.Id == id);
        if (exam != null)
        {
            foreach (var examQuestion in exam.ExamQuestions)
            {
                examQuestion.SelectedAnswers = GetSelectedAnswersForQuestion(examQuestion.Id);
            }
        }
        return exam;
    }
    private IEnumerable<Answer> GetSelectedAnswersForQuestion(int id)
    {
        return _context.ExamQuestions
                .Where(e => e.Id == id)
                .SelectMany(eq => eq.SelectedAnswers)
                .ToList();
    }
}
