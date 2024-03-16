using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories.CategoryRepository;

public interface ICategoryRepository
{
    Task<List<Category>> GetCategories();
    Task<Category> GetCategory(int id);
    Task<Category> CreateCategory(Category category);
    Task<Category> UpdateCategory(Category category);
    Task<bool> DeleteCategory(int id);
}