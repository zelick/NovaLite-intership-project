using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Konteh.BackOfficeApi.Features.Exams;


[ApiController]
[Route("api/exams")]
public class ExamController : Controller
{
    private readonly IMediator _mediator;

    public ExamController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<GetExamsForOverview.Response>> GetAllExams([FromQuery] int page, [FromQuery] int pageSize)
    {
        var response = await _mediator.Send(new GetExamsForOverview.Query
        {
            Page = page,
            PageSize = pageSize
        });

        return Ok(response);
    }

}
