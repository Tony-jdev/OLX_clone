using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.Category;

namespace OLX_clone.BusinessLogicLayer.Services.Contracts;

public interface ICategoryService
{
    Task<ApiResponse<List<GetCategoryDetailsDto>>> GetCategories();
    Task<ApiResponse<GetCategoryDto>> GetCategory(int id);
    Task<ApiResponse<Category>> CreateCategory(CreateCategoryDto category);
    Task<ApiResponse<Category>> UpdateCategory(int id, UpdateCategoryDto categoryUpdateDto);
    Task<ApiResponse<bool>> DeleteCategory(int id);
}