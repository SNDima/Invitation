using System.Net;
using Services;

namespace Invitation.Controllers
{
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        private readonly QuestionsService _questionsService;

        public HomeController()
        {
            _questionsService = new QuestionsService();
        }

        public ActionResult Index()
        {
            ViewBag.Actions = new
            {
                GetQuestion = Url.Action("GetQuestion"),
                GetStatus = Url.Action("GetStatus"),
                SetStatus = Url.Action("SetStatus"),
                SetQuestionTime = Url.Action("SetQuestionTime"),
                AnswerQuestion = Url.Action("AnswerQuestion"),
                MakeDecision = Url.Action("MakeDecision"),
                SendSms = Url.Action("SendSms", "Sms")
            };
            return View();
        }

        public ActionResult GetQuestion()
        {
            var question = _questionsService.GetQuestion();
            if (question == null)
            {
                return Json(new Question {Id = 0}, JsonRequestBehavior.AllowGet);
            }
            return Json(_questionsService.GetQuestion(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetStatus()
        {
            return Json(new {Status = _questionsService.GetStatus()}, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SetStatus(int status)
        {
            _questionsService.SetStatus(status);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        [HttpPost]
        public ActionResult SetQuestionTime(int id, int time)
        {
            _questionsService.SetQuestionTime(id, time);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        [HttpPost]
        public ActionResult AnswerQuestion(int id, string answer)
        {
            return Json(_questionsService.AnswerQuestion(id, answer));
        }

        [HttpGet]
        public ActionResult Flush()
        {
            _questionsService.Flush();
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        [HttpPost]
        public ActionResult MakeDecision(string decision)
        {
            _questionsService.MakeDecision(decision);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        [HttpGet]
        public ActionResult EnablePhone()
        {
            _questionsService.EnablePhone();
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        [HttpGet]
        public ActionResult DisablePhone()
        {
            _questionsService.DisablePhone();
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        [HttpGet]
        public ActionResult IsPhoneEnabled()
        {
            return Json(new { IsPhoneEnabled = _questionsService.IsPhoneEnabled() },
                JsonRequestBehavior.AllowGet);
        }
    }
}