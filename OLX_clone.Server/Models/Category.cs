using System.ComponentModel.DataAnnotations;

namespace OLX_clone.Server.Models;

public class Category
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
}