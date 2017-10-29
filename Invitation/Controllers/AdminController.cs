namespace Invitation.Controllers
{
    using Services;
    using System.Net;
    using System.Web.Mvc;

    public class AdminController : Controller
    {
        private readonly QuestionsService _questionsService;

        public AdminController()
        {
            _questionsService = new QuestionsService();
        }

        public ActionResult Index()
        {
            ViewBag.Actions = new
            {
                Flush = Url.Action("Flush"),
                EnablePhone = Url.Action("EnablePhone"),
                DisablePhone = Url.Action("DisablePhone"),
                IsPhoneEnabled = Url.Action("IsPhoneEnabled")
            };
            return View();
        }

        [HttpGet]
        public ActionResult Flush()
        {
            _questionsService.Flush();
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