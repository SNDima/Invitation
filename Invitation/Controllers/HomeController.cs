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
            return View();
        }

        public ActionResult GetQuestion()
        {
            return Json(_questionsService.GetQuestion());
        }
    }
}