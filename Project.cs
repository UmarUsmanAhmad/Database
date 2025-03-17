public class Project
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Responsible { get; set; } = string.Empty;
    
    public int CustomerId { get; set; } 
    public Customer? Customer { get; set; }  

    public string Service { get; set; } = string.Empty;
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = string.Empty;
    
    public string ProjectNumber { get; set; } = string.Empty; 
}
