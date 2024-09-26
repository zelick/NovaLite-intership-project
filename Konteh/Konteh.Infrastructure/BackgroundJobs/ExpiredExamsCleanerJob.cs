using Konteh.Domain;
using Konteh.Infrastructure.Repositories;
using Quartz;

namespace Konteh.Infrastructure.BackgroundJobs;

public class ExpiredExamsCleanerJob : IJob
{
    private readonly IRepository<Exam> _repository;

    public ExpiredExamsCleanerJob(IRepository<Exam> repository)
    {
        _repository = repository;
    }

    public Task Execute(IJobExecutionContext context)
    {
        var exams = _repository.Search(a => a.Status == ExamStatus.InProgress && a.StartTime.AddHours(1) < DateTime.UtcNow).ToList();
        if (!exams.Any())
            return Task.CompletedTask;
        foreach (var exam in exams)
        {
            exam.Status = ExamStatus.Invalid;
        }
        _repository.SaveChanges();

        return Task.CompletedTask;
    }
}
