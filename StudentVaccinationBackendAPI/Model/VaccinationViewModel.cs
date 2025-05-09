using System.ComponentModel.DataAnnotations;

namespace StudentVaccinationBackenAPI.Model;
public class VaccinationViewModel
{


    public string? Name{get;set;}
    public DateTime Date{get;set;}
    public int NoOfDose{get;set;}
    public string? ClassApplicable{get;set;}

}