﻿using Konteh.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Konteh.BackOfficeApi.Features.Questions;

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
    public async Task<ActionResult<IEnumerable<GetAllQuestions.Response>>> GetAll()
    {
        var response = await _mediator.Send(new GetAllQuestions.Query());
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> Add(AddQuestion.Command command)
    {
        await _mediator.Send(command);
        return Ok();
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(Question), StatusCodes.Status200OK)]
    public async Task<ActionResult<Question>> GetQuestionById(int id)
    {
        var response = await _mediator.Send(new GetQuestionById.Query { Id = id });
        return response == null ? NotFound() : Ok(response);
    }

}
