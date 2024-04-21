using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Data.Configurations;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data;

public class ApplicationDbContext: IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions options) : base(options){}
    
    public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    
    public DbSet<Category> Categories { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<PostView> PostViews { get; set; }
    public DbSet<PostPhoto> PostPhotos { get; set; }
    public DbSet<Chat> Chats { get; set; }
    public DbSet<ChatMessage> ChatMessages { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfiguration(new RoleConfiguration());
        
        builder.Entity<ChatMessage>()
            .HasOne(cm => cm.Sender)
            .WithMany()
            .HasForeignKey(cm => cm.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<ChatMessage>()
            .HasOne(cm => cm.Receiver)
            .WithMany()
            .HasForeignKey(cm => cm.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.Entity<Chat>()
            .HasOne(cm => cm.Customer)
            .WithMany()
            .HasForeignKey(cm => cm.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Chat>()
            .HasOne(cm => cm.Seller)
            .WithMany()
            .HasForeignKey(cm => cm.SellerId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}