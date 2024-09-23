using Konteh.BackOfficeApi.HubConfig;
using Konteh.Infrastructure.Events;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace Konteh.BackOfficeApi.Consumers;

public class ExamRequestedConsumer : IConsumer<ExamRequestedEvent>
{
    private readonly IHubContext<ExamHub> _hubContext;
    public ExamRequestedConsumer(IHubContext<ExamHub> hubContext)
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<ExamRequestedEvent> context)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveExamRequest", context.Message);
    }
}