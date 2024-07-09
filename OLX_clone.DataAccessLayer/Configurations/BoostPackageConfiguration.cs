using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Configurations;

public class BoostPackageConfiguration: IEntityTypeConfiguration<BoostPackage>
{
     public void Configure(EntityTypeBuilder<BoostPackage> builder)
    {
        builder.HasData(
            new BoostPackage { Id = 1, Name = "Легкий старт", Type = BoostType.Top, Price = 21, BoostCount = 0,
                NumberOfDays = 1, TopDurationInDays = 3, VipDurationInDays = 0},
            new BoostPackage { Id = 2, Name = "Швидкий продаж", Type = BoostType.Top, Price = 33, BoostCount = 3,
                NumberOfDays = 1, TopDurationInDays = 7, VipDurationInDays = 0},
            new BoostPackage { Id = 3, Name = "Турбо продаж", Type = BoostType.Vip, Price = 109, BoostCount = 9,
                NumberOfDays = 1, TopDurationInDays = 30, VipDurationInDays = 7}
        );
    }
}