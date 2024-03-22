using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models;

public class PostView
{
    [Key]
    public int Id { get; set; }
    public DateTime ViewedAt{ get; set; }
    [ForeignKey("PostId")]
    public Post Post { get; set; }
}