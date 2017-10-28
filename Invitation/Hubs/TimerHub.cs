namespace Invitation.Hubs
{
    using Microsoft.AspNet.SignalR;
    using Services;
    using System;
    using System.Timers;

    public class TimerHub : Hub
    {
        private readonly QuestionsService _questionsService;
        private static System.Timers.Timer aTimer;

        public TimerHub()
        {
            _questionsService = new QuestionsService();
        }

        public void StartTimer()
        {
            Clients.All.showTime(_questionsService.GetTimer());

            SetTimer();
        }

        private void SetTimer()
        {
            // Create a timer with a one second interval.
            aTimer = new System.Timers.Timer(1000);
            // Hook up the Elapsed event for the timer. 
            aTimer.Elapsed += new ElapsedEventHandler(OnTimedEvent);
            aTimer.AutoReset = true;
            aTimer.Enabled = true;
        }

        private void OnTimedEvent(Object source, ElapsedEventArgs e)
        {
            var time = _questionsService.GetTimer();
            if (time == 0)
            {
                _questionsService.SetTimer(300);
                aTimer.Stop();
                aTimer.Dispose();
                _questionsService.SetStatus(6);
            }
            else
            {
                _questionsService.SetTimer(time - 1);
                var newTime = time - 1;
                Clients.All.showTime(newTime);
            }
        }
    }
}