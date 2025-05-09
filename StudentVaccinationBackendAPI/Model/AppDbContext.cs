using Microsoft.EntityFrameworkCore;

namespace StudentVaccinationBackenAPI.Model;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Student> Students => Set<Student>();
    public DbSet<StudentVaccinationDetail> StudentVaccinationDetail => Set<StudentVaccinationDetail>();
    public DbSet<VaccinationSchedule> VaccinationSchedules => Set<VaccinationSchedule>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

     // Define many-to-many relationship via explicit join table
        modelBuilder.Entity<StudentVaccinationDetail>()
            .HasKey(sc => new { sc.StudentId, sc.VaccinationId }); // Composite key

        modelBuilder.Entity<StudentVaccinationDetail>()
            .HasOne(sc => sc.Student)
            .WithMany(s => s.StudentVaccinationDetails)
            .HasForeignKey(sc => sc.StudentId);

        modelBuilder.Entity<StudentVaccinationDetail>()
            .HasOne(sc => sc.VaccinationSchedule)
            .WithMany(c => c.StudentVaccinationDetails)
            .HasForeignKey(sc => sc.VaccinationId);
    }
}
