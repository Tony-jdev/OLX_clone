using AutoMapper;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Data.Repositories.CategoryRepository;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;

namespace OLX_clone.Server.Services.CategoryService;

public class CategoryService: ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;
    
    public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
    {
        _categoryRepository = categoryRepository;
        _mapper = mapper;
    }
    
    public async Task<ApiResponse<List<Category>>> GetCategories()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return new ApiResponse<List<Category>> { Data = categories, Message = "Categories retrieved successfully." };
    }
    
    public async Task<ApiResponse<Category>> GetCategory(int id)
    {
        var category = await _categoryRepository.GetAsync(id);
        return category == null ? new ApiResponse<Category> { Success = false, Message = "Category not found." } 
            : new ApiResponse<Category> { Data = category, Message = "Category retrieved successfully." };
    }
    
    public async Task<ApiResponse<Category>> CreateCategory(CreateCategoryDto categoryCreateDto)
    {
        var categoryToCreate = _mapper.Map<CreateCategoryDto, Category>(categoryCreateDto);
        
        var createdCategory = await _categoryRepository.AddAsync(categoryToCreate);

        return new ApiResponse<Category> { Data = createdCategory, Message = "Category created successfully" };
    }
    
    public async Task<ApiResponse<Category>> UpdateCategory(int id, UpdateCategoryDto categoryUpdateDto)
    {
        Category categoryFromDb = await _categoryRepository.GetAsync(id);
        if (categoryFromDb == null)
            return new ApiResponse<Category> { Success = false, Message = "Category not found." };

        categoryFromDb = _mapper.Map(categoryUpdateDto, categoryFromDb);

        var updatedCategory = await _categoryRepository.UpdateAsync(categoryFromDb);

        return new ApiResponse<Category> { Data = updatedCategory, Message = "Category updated successfully" };
    }
    
    public async Task<ApiResponse<bool>> DeleteCategory(int id)
    {
        Category categoryFromDb = await _categoryRepository.GetAsync(id);
        if (categoryFromDb == null)
            return new ApiResponse<bool> { Success = false, Message = "Category not found." };

        var deletedCategory = await _categoryRepository.DeleteAsync(id);

        return !deletedCategory ? new ApiResponse<bool> { Success = false, Message = "Error occured while deleting category." } 
            : new ApiResponse<bool> { Message = "Category deleted successfully" };
    }
}