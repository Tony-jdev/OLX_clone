using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OLX_clone.Server.Models;

public class Category
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    public int? ParentId { get; set; }
    
    [ForeignKey("ParentId")]
    public Category ParentCategory { get; set; }
    public ICollection<Category> ChildCategories { get; set; }
}