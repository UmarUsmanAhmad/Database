using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
    {
        var projects = await _context.Projects.Include(p => p.Customer).ToListAsync();
        return Ok(projects);
    }

    [HttpPost]
    public async Task<ActionResult<Project>> CreateProject(Project project)
    {
        if (project.CustomerId <= 0)
        {
            return BadRequest("Customer ID must be a valid positive number.");
        }

        var existingCustomer = await _context.Customers.FindAsync(project.CustomerId);
        if (existingCustomer == null)
        {
            existingCustomer = new Customer { Id = project.CustomerId, Name = $"Customer-{project.CustomerId}" };
            await _context.Customers.AddAsync(existingCustomer);
            await _context.SaveChangesAsync();
        }

        project.Customer = existingCustomer;

        if (string.IsNullOrWhiteSpace(project.ProjectNumber))
        {
            project.ProjectNumber = GenerateUniqueProjectNumber();
        }
        else
        {
            var existingProject = await _context.Projects.AnyAsync(p => p.ProjectNumber == project.ProjectNumber);
            if (existingProject)
            {
                return BadRequest("Project number must be unique. Please choose another.");
            }
        }

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProjects), new { id = project.Id }, project);
    }

    private string GenerateUniqueProjectNumber()
    {
        return $"P-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}";
    }
}
