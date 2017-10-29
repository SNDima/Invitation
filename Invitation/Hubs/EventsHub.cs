namespace Invitation.Hubs
{
    using Microsoft.AspNet.SignalR;

    public class EventsHub : Hub
    {
        public void SendMessage(string message)
        {
            Clients.All.sendMessage(message);
        }

        public void ShowQuestionTime(int time)
        {
            Clients.All.showQuestionTime(time);
        }
    }
}