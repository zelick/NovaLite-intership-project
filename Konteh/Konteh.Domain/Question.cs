namespace Konteh.Domain;

public class Question
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public QuestionCategory Category { get; set; }
    public QuestionType Type { get; set; }
    public IList<Answer> Answers { get; set; } = new List<Answer>();
}
