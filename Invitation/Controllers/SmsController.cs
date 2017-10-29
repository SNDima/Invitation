namespace Invitation.Controllers
{
    using System.Web.Mvc;
    using System.Configuration;
    using Twilio;
    using Twilio.AspNet.Mvc;
    using Twilio.Rest.Api.V2010.Account;
    using Services;

    public class SmsController : TwilioController
    {
        private readonly QuestionsService _questionsService;

        public SmsController()
        {
            _questionsService = new QuestionsService();
        }

        public ActionResult SendSms()
        {
            if (_questionsService.IsPhoneEnabled())
            {
                var accountSid = ConfigurationManager.AppSettings["TwilioAccountSid"];
                var accountToken = ConfigurationManager.AppSettings["TwilioAccountToken"];
                TwilioClient.Init(accountSid, accountToken);

                var to = ConfigurationManager.AppSettings["MyPhoneNumber"];
                var from = ConfigurationManager.AppSettings["TwilioPhoneNumber"];

                var message = MessageResource.Create(
                    to: to,
                    from: from,
                    body: "Vera's come in.");

                return Content(message.Sid);
            }
            return new ContentResult();
        }
    }
}