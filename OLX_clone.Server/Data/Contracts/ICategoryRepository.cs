using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Contracts;

public interface ICategoryRepository : IGenericRepository<Category>
{
    Task<List<int>> GetCategoryAndChildrenIds(string categorySKU);
}