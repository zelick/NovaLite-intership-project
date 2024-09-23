﻿using MediatR;
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
    public async Task<ActionResult<GetExamsForOverview.Response>> GetAllExams(
    [FromQuery] GetExamsForOverview.Query request)
    {
        var response = await _mediator.Send(request);
        return Ok(response);
    }

}
