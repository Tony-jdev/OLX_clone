using Microsoft.AspNetCore.Identity;
using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Configurations;

public class UserSeeder
{
    public static async Task Initialize(IServiceProvider serviceProvider,
        UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        var adminRole = new IdentityRole("Administrator");
        var userRole = new IdentityRole("User");

        if (!await roleManager.RoleExistsAsync(adminRole.Name))
        {
            await roleManager.CreateAsync(adminRole);
        }

        if (!await roleManager.RoleExistsAsync(userRole.Name))
        {
            await roleManager.CreateAsync(userRole);
        }

        var adminEmail = "admin@example.com";
        var adminUser = await userManager.FindByEmailAsync(adminEmail);

        if (adminUser == null)
        {
            adminUser = new ApplicationUser
            {
                Name = "Admin",
                Surname = "eVSE",
                UserName = "admin",
                Email = "admin@example.com",
            };

            await userManager.CreateAsync(adminUser, "Admin@123");
            await userManager.AddToRoleAsync(adminUser, adminRole.Name);
        }
    }
}