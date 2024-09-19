using Microsoft.AspNetCore.SignalR;

namespace Konteh.BackOfficeApi.HubConfig;

public class ExamHub : Hub
{
    //public async Task SendMessage(string message)
    //{
    //    await Clients.All.SendAsync("Recive message", $"{Context.ConnectionId}", message);
    //}
}