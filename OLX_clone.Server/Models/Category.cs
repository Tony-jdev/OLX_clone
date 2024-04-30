using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models;

public class Category
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    
    public string SKU { get; set; }
    
    public int? ParentId { get; set; }
    
    [ForeignKey("ParentId")]
    public Category ParentCategory { get; set; }
    public ICollection<Category> ChildCategories { get; set; }
}