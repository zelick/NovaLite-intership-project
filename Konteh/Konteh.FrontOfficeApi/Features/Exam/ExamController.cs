namespace Konteh.FrontOfficeApi.Features.Exams;

using MediatR;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/exams")]
public class ExamController : Controller
{
    private readonly IMediator _mediator;

    public ExamController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<GenerateExam.Response>> CreateExam([FromBody] GenerateExam.Command candidate)
    {
        var response = await _mediator.Send(candidate);
        return Ok(response);
    }
}

