namespace Konteh.FrontOfficeApi.Features.Exam;

using Konteh.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/exams")]
public class ExamController : Controller
{
    private readonly IMediator _mediator;
    private readonly ILogger<ExamController> _logger;

    public ExamController(IMediator mediator, ILogger<ExamController> logger)
    {
        _mediator = mediator;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<GenerateExam.Response>> CreateExam([FromBody] GenerateExam.Query candidate)
    {
        try
        {
            var response = await _mediator.Send(candidate);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while creating the exam.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
        }
    }
}

