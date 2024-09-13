namespace Konteh.FrontOfficeApi.Features.Questions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/questions")]
public class QuestionController : Controller
{
    private readonly IMediator _mediator;

    public QuestionController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GenerateTestQuestions.Response>>> GetAll()
    {
        var response = await _mediator.Send(new GenerateTestQuestions.Query());
        return Ok(response);
    }
}
