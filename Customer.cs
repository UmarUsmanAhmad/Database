public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<Project>? Projects { get; set; } 
}
