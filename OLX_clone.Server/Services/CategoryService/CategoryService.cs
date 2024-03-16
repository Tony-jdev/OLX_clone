using AutoMapper;
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
        var categories = await _categoryRepository.GetCategories();
        return new ApiResponse<List<Category>> { Data = categories, Message = "Categories retrieved successfully." };
    }
    
    public async Task<ApiResponse<Category>> GetCategory(int id)
    {
        var category = await _categoryRepository.GetCategory(id);
        return category == null ? new ApiResponse<Category> { Success = false, Message = "Category not found." } 
            : new ApiResponse<Category> { Data = category, Message = "Category retrieved successfully." };
    }
    
    public async Task<ApiResponse<Category>> CreateCategory(CreateCategoryDto categoryCreateDto)
    {
        var categoryToCreate = _mapper.Map<CreateCategoryDto, Category>(categoryCreateDto);
        
        var createdCategory = await _categoryRepository.CreateCategory(categoryToCreate);

        return new ApiResponse<Category> { Data = createdCategory, Message = "Category created successfully" };
    }
}