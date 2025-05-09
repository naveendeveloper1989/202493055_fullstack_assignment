using Microsoft.AspNetCore.Mvc;
using StudentVaccinationBackenAPI.Model;

namespace StudentVaccinationBackenAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _appDbContext;
    public DashboardController(AppDbContext appDbContext)
    {
        _appDbContext=appDbContext;
    }
    [Route("dashboard")]
    [HttpGet]
    public IActionResult GetDashboard()
    {
        var dashboard=new Dashboard(){
            TotalStudentCount = _appDbContext.Students.Count(),
            TotalStudentVaccinated = _appDbContext.StudentVaccinationDetail.Select(v=>v.StudentId).Distinct().Count(),
        };
        dashboard.TotalVaccinatedPercentage = Math.Round(((decimal)dashboard.TotalStudentVaccinated/dashboard.TotalStudentCount) * 100);
        dashboard.Drives = _appDbContext.VaccinationSchedules.Select(v=> new VaccinationModal(){
            Name = v.Name,
            Date = v.Date.ToString("dd-MMM-yyyy")
        }).ToList();


        return Ok(dashboard);
    }
}
