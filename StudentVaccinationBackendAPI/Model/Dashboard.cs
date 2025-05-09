namespace StudentVaccinationBackenAPI.Model;
public class Dashboard{
    public int TotalStudentCount{get;set;}
    public decimal TotalVaccinatedPercentage{get;set;}
        
    public int TotalStudentVaccinated{get;set;}
    public List<VaccinationModal> Drives{get;set;}=new();
}
public class VaccinationModal{
    public string Name{get;set;}
    public string Date{set;get;}
}