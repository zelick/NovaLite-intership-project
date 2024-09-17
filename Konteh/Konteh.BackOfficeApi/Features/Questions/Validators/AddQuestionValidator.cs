using FluentValidation;
using Konteh.Domain;

namespace Konteh.BackOfficeApi.Features.Questions.Validators;

public class AddQuestionValidator : AbstractValidator<AddQuestion.Command>
{
    public AddQuestionValidator()
    {
        RuleFor(x => x.Text).NotEmpty().WithMessage("Question text is required.");
        RuleFor(x => x.Type).IsInEnum().WithMessage("Invalid question type.");
        RuleFor(x => x.Category).IsInEnum().WithMessage("Invalid question category.");
        RuleFor(x => x.Answers).Must(a => a.Count() >= 2).WithMessage("At least two answers are required.");

        RuleFor(x => x).Must(HaveExactlyOneCorrectAnswer)
            .When(x => x.Type == QuestionType.RadioButton)
            .WithMessage("A question of type RadioButton must have exactly one correct answer.");

        RuleFor(x => x).Must(HaveAtLeastTwoCorrectAnswers)
            .When(x => x.Type == QuestionType.Checkbox)
            .WithMessage("A question of type CheckBox must have at least two correct answers.");

        RuleForEach(x => x.Answers)
               .SetValidator(new AnswerValidator());
    }
    private bool HaveExactlyOneCorrectAnswer(AddQuestion.Command command)
    {
        return command.Answers.Count(a => a.IsCorrect) == 1;
    }
    private bool HaveAtLeastTwoCorrectAnswers(AddQuestion.Command command)
    {
        return command.Answers.Count(a => a.IsCorrect) >= 2;
    }
}


