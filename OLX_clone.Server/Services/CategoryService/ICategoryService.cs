using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;

namespace OLX_clone.Server.Services.CategoryService;

public interface ICategoryService
{
    Task<ApiResponse<List<Category>>> GetCategories();
    Task<ApiResponse<Category>> GetCategory(int id);
    Task<ApiResponse<Category>> CreateCategory(CreateCategoryDto category);
}