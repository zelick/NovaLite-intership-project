using FluentValidation;

namespace Konteh.BackOfficeApi.Features.Questions.Validators;

public class AnswerValidator : AbstractValidator<AddQuestion.AnswerRequest>
{
    public AnswerValidator()
    {
        RuleFor(a => a.Text).NotEmpty().WithMessage("Answer text is required.");
    }
}
