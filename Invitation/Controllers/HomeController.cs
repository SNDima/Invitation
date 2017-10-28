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
                SetQuestionTime = Url.Action("SetQuestionTime")
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
    }
}