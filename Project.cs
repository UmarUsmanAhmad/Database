
using System;
using System.ComponentModel.DataAnnotations;

public class Project
{
    [Key]
    public int Id { get; set; }
    
    public string Number { get; set; } = string.Empty; 
    public string Name { get; set; } = string.Empty;  
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Responsible { get; set; } = string.Empty;  
    public string Customer { get; set; } = string.Empty; 
    public string Service { get; set; } = string.Empty;  
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = "Ej påbörjat";  
}
