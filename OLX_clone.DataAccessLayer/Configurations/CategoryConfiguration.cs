using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Configurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasData(
            new Category { Id = 1, Title = "Electronics", SKU = "electronics" },
            new Category { Id = 2, Title = "Fashion", SKU = "fashion" },
            new Category { Id = 3, Title = "Home and Garden", SKU = "home" },
            new Category { Id = 4, Title = "Real estate", SKU = "real_estate" },
            new Category { Id = 5, Title = "Cars", SKU = "cars" },
            new Category { Id = 6, Title = "Animals", SKU = "animals" },
            new Category { Id = 7, Title = "Job", SKU = "job" },
            new Category { Id = 8, Title = "Business and services", SKU = "business_and_services" },
            new Category { Id = 9, Title = "Children's world", SKU = "childrens_world" },
            new Category { Id = 10, Title = "Sport", SKU = "sport" }
        );
    }
}