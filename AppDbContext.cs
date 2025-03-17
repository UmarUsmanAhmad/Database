using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Project> Projects { get; set; }
    public DbSet<Customer> Customers { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>()
            .HasOne(p => p.Customer)
            .WithMany(c => c.Projects)
            .HasForeignKey(p => p.CustomerId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Project>()
            .HasIndex(p => p.ProjectNumber)
            .IsUnique();

        modelBuilder.Entity<Customer>().HasData(
            new Customer { Id = 1001, Name = "Customer A" },
            new Customer { Id = 1002, Name = "Customer B" }
        );

        
        modelBuilder.Entity<Project>().HasData(
            new Project
            {
                Id = 1,
                Name = "Project 1",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(30),
                Responsible = "John Doe",
                CustomerId = 1001,  
                Service = "Consulting",
                TotalPrice = 1000.00m,
                Status = "Pågående",
                ProjectNumber = "P-001"
            },
            new Project
            {
                Id = 2,
                Name = "Project 2",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(60),
                Responsible = "Jane Smith",
                CustomerId = 1002,  
                Service = "Development",
                TotalPrice = 2000.00m,
                Status = "Ej påbörjat",
                ProjectNumber = "P-002"
            }
        );
    }
}
