using System.ComponentModel.DataAnnotations;

namespace StudentVaccinationBackenAPI.Model;
public class VaccinationUpdateViewModel
{
    public string? Id{get;set;}
    public string? Name{get;set;}
    public DateTime Date{get;set;}
    public int NoOfDose{get;set;}
    public string? ClassApplicable{get;set;}

}