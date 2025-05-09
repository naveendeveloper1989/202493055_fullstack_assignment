using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentVaccinationBackenAPI.Model;

namespace StudentVaccinationBackenAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase
{
    private readonly AppDbContext _appDbContext;
    public StudentController(AppDbContext appDbContext)
    {
        _appDbContext=appDbContext;
    }

    [HttpPost]
    public IActionResult Add(StudentViewModal student)
    {        
        Guid id = Guid.NewGuid();
        string idstr = id.ToString();

        Student stud= new Student(){
            Id = idstr,
            Name = student.Name,
            Class = student.Class
        };
        _appDbContext.Add(stud);
        _appDbContext.SaveChanges();
        return Ok();
    }

    [HttpPut]
    public IActionResult Update(StudentViewModal student)
    {        
        Student stud = _appDbContext.Students.Where(s=>s.Id==student.Id).FirstOrDefault();
        if(stud==null){
            return NotFound();
        }
        stud.Name=student.Name;
        stud.Class=student.Class;
        _appDbContext.Update(stud);
        _appDbContext.SaveChanges();
        return Ok();
    }
    [Route("list")]
     [HttpPost]
    public IActionResult Get([FromBody] StudentFilter filter)
    {    
        var studlist = _appDbContext
        .Students
        .Include(s=>s.StudentVaccinationDetails)
        .ThenInclude(sv=>sv.VaccinationSchedule)
        .Select(s => new
        {
            Id = s.Id,
            Name = s.Name,
            Class = s.Class,
            Vaccinations = s.StudentVaccinationDetails.Select(sc => new {
                sc.VaccinationSchedule.Name,
                // Avoid selecting recursive navigation like sc.Course.Students
            }).ToList()
        })
        .Where(
            s=>(string.IsNullOrEmpty(filter.Id) || s.Id==filter.Id)
            && (string.IsNullOrEmpty(filter.Name) || s.Name==filter.Name)
            && (string.IsNullOrEmpty(filter.Class) || s.Class==filter.Class)
            && ((!filter.Vaccinated) || (filter.Vaccinated && s.Vaccinations.Any()))
            )
        .ToList();  
      
        
       /*  if (filters.TryGetValue("id", out var id))
            query = query.Where(s => s.Id.ToString() == id);
        if (filters.TryGetValue("name", out var name))
            query = query.Where(s => s.Name.Contains(name));
        if (filters.TryGetValue("class", out var cls))
            query = query.Where(s => s.Class.Contains(cls)); */
            return Ok(studlist);
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(string id){
         Student stud = _appDbContext.Students.Where(s=>s.Id==id).FirstOrDefault();
        if(stud==null){
            return NotFound();
        }
         _appDbContext.Remove(stud);
        _appDbContext.SaveChanges();
        return Ok();
    }
    [Route("Report")]
    [HttpGet]
    public IActionResult Report(){
        var result = (from s in _appDbContext.Students
              join sv in _appDbContext.StudentVaccinationDetail
              on s.Id equals sv.StudentId
              join vs in _appDbContext.VaccinationSchedules
              on sv.VaccinationId equals vs.Id
              select new Report() {
                  StudentName = s.Name,
                  VaccinationName = vs.Name,
                  IsVaccinated = "Vaccinated",
                  VaccinatedDate = sv.DateVaccinated.ToString("dd-MMM-yyyy")
              }).ToList()
              .Select((item, index) => new Report{
                  Id = index + 1,
                  StudentName = item.StudentName,
                  VaccinationName = item.VaccinationName,
                  IsVaccinated = item.IsVaccinated,
                  VaccinatedDate=item.VaccinatedDate
              })
              .ToList();
              return Ok(result);
    }
}
