using Microsoft.AspNetCore.Mvc;
using StudentVaccinationBackenAPI.Model;

namespace StudentVaccinationBackenAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VaccinationController : ControllerBase
{

    private readonly AppDbContext _appDbContext;
    public VaccinationController(AppDbContext appDbContext)
    {
        _appDbContext=appDbContext;
    }

    [HttpPost]
    public IActionResult Add(VaccinationViewModel vacc)
    {        
        Guid id = Guid.NewGuid();
        string idstr = id.ToString();

        VaccinationSchedule vaccination= new VaccinationSchedule(){
            Id = idstr,
            Name = vacc.Name,
            Date = vacc.Date,
            NoOfDose = vacc.NoOfDose,
            ClassApplicable = vacc.ClassApplicable
            
        };
        _appDbContext.Add(vaccination);
        _appDbContext.SaveChanges();
        return Ok();
    }

    [HttpPut]
    public IActionResult Update(VaccinationUpdateViewModel vaccination)
    {        
        VaccinationSchedule vacc = _appDbContext.VaccinationSchedules.Where(s=>s.Id==vaccination.Id).FirstOrDefault();
        if(vacc==null){
            return NotFound();
        }
        vacc.Name=vaccination.Name;
        vacc.Date=vaccination.Date;
        vacc.NoOfDose = vaccination.NoOfDose;
        vacc.ClassApplicable = vaccination.ClassApplicable;
        _appDbContext.Update(vacc);
        _appDbContext.SaveChanges();
        return Ok();
    }

     [HttpGet]
    public IActionResult Get()
    {    
        List<VaccinationSchedule> vacc = _appDbContext.VaccinationSchedules.ToList();   
        return Ok(vacc);
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(string id){
         VaccinationSchedule vacc = _appDbContext.VaccinationSchedules.Where(s=>s.Id==id).FirstOrDefault();
        if(vacc==null){
            return NotFound();
        }
         _appDbContext.Remove(vacc);
        _appDbContext.SaveChanges();
        return Ok();
    }
    [Route("student/{studid}/vaccination/{vaccid}")]
    [HttpPost]
    public IActionResult MarkStudentVaccinated(string studid,string vaccid){
        Guid id = Guid.NewGuid();
        string idstr = id.ToString();

        StudentVaccinationDetail vaccination= new StudentVaccinationDetail(){
            Id = idstr,
            StudentId = studid,
            VaccinationId = vaccid,
            DateVaccinated = DateTime.UtcNow
            
        };
        _appDbContext.Add(vaccination);
        _appDbContext.SaveChanges();
        return Ok();
    }
}
