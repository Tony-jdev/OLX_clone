using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories;

public class BoostPackageRepositoory: GenericRepository<BoostPackage>, IBoostPackageRepository
{
    public BoostPackageRepositoory(ApplicationDbContext context) : base(context)
    {
      
    }
}