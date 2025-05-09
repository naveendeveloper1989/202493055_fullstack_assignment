using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace StudentVaccinationBackenAPI.Model;
public class Student{
    [Key]
    public string? Id{get;set;}
    public string? Name{get;set;}
    public string? Class{get;set;}
    public ICollection<StudentVaccinationDetail> StudentVaccinationDetails {get;set;}=new List<StudentVaccinationDetail>();

}