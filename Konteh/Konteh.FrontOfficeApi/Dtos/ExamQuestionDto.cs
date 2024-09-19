namespace Konteh.FrontOfficeApi.Dtos;
public class ExamQuestionDto
{
    public int QuestionId { get; set; }
    public string QuestionText { get; set; } = string.Empty;
    public List<AnswerDto> SelectedAnswers { get; set; } = new();
}
