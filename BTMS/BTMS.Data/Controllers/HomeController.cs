using Microsoft.AspNetCore.Mvc;

namespace BTMS.Data.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
