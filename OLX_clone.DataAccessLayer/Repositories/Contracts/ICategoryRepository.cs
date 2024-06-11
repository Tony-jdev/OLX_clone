using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Repositories.Contracts;

public interface ICategoryRepository : IGenericRepository<Category>
{
    Task<List<Category>> GetParentCategories();
    Task<List<int>> GetCategoryAndChildrenIds(string categorySKU);
}