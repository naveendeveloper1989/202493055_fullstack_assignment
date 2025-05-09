using System.ComponentModel.DataAnnotations;

namespace StudentVaccinationBackenAPI.Model;
public class VaccinationSchedule
{
    [Key]
    public string? Id{get;set;}
    public string? Name{get;set;}
    public DateTime Date{get;set;}
    public int NoOfDose{get;set;}
    public string? ClassApplicable{get;set;}
    public ICollection<StudentVaccinationDetail> StudentVaccinationDetails {get;set;}=new List<StudentVaccinationDetail>();
}