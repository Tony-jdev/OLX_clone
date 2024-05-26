using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;
using OLX_clone.Server.Models.Dtos.Category;

namespace OLX_clone.Server.Services.CategoryService;

public interface ICategoryService
{
    Task<ApiResponse<List<GetCategoryDetailsDto>>> GetCategories();
    Task<ApiResponse<GetCategoryDto>> GetCategory(int id);
    Task<ApiResponse<Category>> CreateCategory(CreateCategoryDto category);
    Task<ApiResponse<Category>> UpdateCategory(int id, UpdateCategoryDto categoryUpdateDto);
    Task<ApiResponse<bool>> DeleteCategory(int id);
}