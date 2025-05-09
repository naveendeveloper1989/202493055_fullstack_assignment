using Microsoft.AspNetCore.Mvc;

namespace StudentVaccinationBackenAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    [Route("auth")]
    [HttpPost]
    public IActionResult ValidateUser(string username,string password)
    {
        if(username.Equals("naveen") && password.Equals("naveen")){
            return Ok();
        }
        else{
            return Unauthorized();
        }
    }
}
