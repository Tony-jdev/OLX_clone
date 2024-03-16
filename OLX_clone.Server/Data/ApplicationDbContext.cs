using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data;

public class ApplicationDbContext: IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options){}
    
    public DbSet<Category> Categories { get; set; }
}