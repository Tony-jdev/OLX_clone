using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OLX_clone.DataAccessLayer.Configurations;
using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer;

public class ApplicationDbContext: IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions options) : base(options){}
    
    public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    
    public DbSet<Category> Categories { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Favorite> Favorites { get; set; }
    public DbSet<BoostPackage> BoostPackages { get; set; }
    public DbSet<PostBoost> PostBoosts { get; set; }
    public DbSet<PostView> PostViews { get; set; }
    public DbSet<PostPhoto> PostPhotos { get; set; }
    public DbSet<Chat> Chats { get; set; }
    public DbSet<ChatMessage> ChatMessages { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new CategoryConfiguration());
        
        modelBuilder.Entity<ChatMessage>()
            .HasOne(cm => cm.Sender)
            .WithMany()
            .HasForeignKey(cm => cm.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ChatMessage>()
            .HasOne(cm => cm.Receiver)
            .WithMany()
            .HasForeignKey(cm => cm.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<Chat>()
            .HasOne(cm => cm.Customer)
            .WithMany()
            .HasForeignKey(cm => cm.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Chat>()
            .HasOne(cm => cm.Seller)
            .WithMany()
            .HasForeignKey(cm => cm.SellerId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}