using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Konteh.BackOfficeApi.Features.Questions;

[Authorize]
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

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<ActionResult> Delete(int id) 
    {
        try
        {
            await _mediator.Send(new DeleteQuestion.Command { Id = id });
            return Ok();
        }
        catch(KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        
        
    }

    [HttpPut]
    [Route("search/")]
    public async Task<ActionResult<SearchQuestions.SearchResponse>> Search(SearchQuestions.Query request)
    {
        var response = await _mediator.Send(request);
        return Ok(response);
    }
}
