using System.ComponentModel.DataAnnotations;

namespace StudentVaccinationBackenAPI.Model;
public class StudentVaccinationDetail{
    [Key]
    public string? Id {get;set;}
    public string? StudentId{get;set;}
    public Student Student {get;set;}
    public string? VaccinationId{get;set;}
    public VaccinationSchedule VaccinationSchedule{get;set;}
    public DateTime DateVaccinated{get;set;}

}