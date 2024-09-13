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

    [HttpGet]
    [Route("{page:int}&{pageSize:int}")]
    public async Task<ActionResult<IEnumerable<GetAllQuestions.Response>>> GetAllPaged(int page, int pageSize)
    {
        var response = await _mediator.Send(new GetPagedQuestions.Query{ Page = page, PageSize = pageSize});
        return Ok(response);
    }

    [HttpGet]
    [Route("search/{text}&{page:int}&{pageSize:int}")]
    public async Task<ActionResult<IEnumerable<GetAllQuestions.Response>>> Search(string text, int page, int pageSize)
    {
        var response = await _mediator.Send(new SearchQuestions.Query { Text = text, Page = page, PageSize = pageSize });
        return Ok(response);
    }
}
