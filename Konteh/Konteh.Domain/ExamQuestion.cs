namespace Konteh.Domain;

public class ExamQuestion
{
    public int Id { get; set; }
    public Question Question { get; set; } = null!;
    public IEnumerable<Answer> SelectedAnswers { get; set; } = [];
}
