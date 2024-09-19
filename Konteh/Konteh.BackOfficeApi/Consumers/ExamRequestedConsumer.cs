using Konteh.BackOfficeApi.HubConfig;
using Konteh.Infrastructure.Events;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

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
        var jsonMessage = JsonSerializer.Serialize(context.Message);
        await _hubContext.Clients.All.SendAsync("ReceiveExamRequest", jsonMessage);
        await Task.CompletedTask;
    }
}