using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Konteh.FrontOfficeApi.Features.ExamQuestions;

[ApiController]
[Route("api/examQuestion")]
public class ExamQuestionController : Controller
{
    private readonly IMediator _mediator;

    public ExamQuestionController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPut]
    public async Task<ActionResult> Update(UpdateExamQuestions.Command request)
    {
        await _mediator.Send(request);
        return Ok();
    }
}
