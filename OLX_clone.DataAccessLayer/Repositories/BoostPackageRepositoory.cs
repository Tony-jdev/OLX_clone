using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.DataAccessLayer.Repositories;

public class BoostPackageRepositoory: GenericRepository<BoostPackage>, IBoostPackageRepository
{
    public BoostPackageRepositoory(ApplicationDbContext context) : base(context)
    {
      
    }
}