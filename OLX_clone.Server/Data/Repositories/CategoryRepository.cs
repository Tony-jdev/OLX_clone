using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories;

public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
   public CategoryRepository(ApplicationDbContext context) : base(context)
   {
      
   }
   
   public async Task<List<Category>> GetParentCategories()
   {
      return await _context.Categories
         .Where(c => c.ParentId == null)
         .Include(c => c.ChildCategories)
         .ToListAsync();
   }
   
   public async Task<List<int>> GetCategoryAndChildrenIds(string categorySKU)
   {
      var categoryId = await _context.Categories
         .Where(c => c.SKU == categorySKU)
         .Select(c => c.Id)
         .FirstOrDefaultAsync();

      if (categoryId == 0)
      {
         return new List<int>();
      }

      return await GetCategoryAndChildrenIdsRecursive(categoryId);
   }

   private async Task<List<int>> GetCategoryAndChildrenIdsRecursive(int categoryId)
   {
      var categoryIds = new List<int> { categoryId };

      var childIds = await _context.Categories
         .Where(c => c.ParentId == categoryId)
         .Select(c => c.Id)
         .ToListAsync();

      foreach (var childId in childIds)
      {
         var grandchildrenIds = await GetCategoryAndChildrenIdsRecursive(childId);
         categoryIds.AddRange(grandchildrenIds);
      }

      return categoryIds;
   }
}