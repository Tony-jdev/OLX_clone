using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Data.Repositories.GenericRepositor;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories.CategoryRepository;

public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
   public CategoryRepository(ApplicationDbContext context) : base(context)
   {
      
   }
}