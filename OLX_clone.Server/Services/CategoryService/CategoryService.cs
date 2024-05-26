using AutoMapper;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;
using OLX_clone.Server.Models.Dtos.Category;

namespace OLX_clone.Server.Services.CategoryService;

public class CategoryService: ICategoryService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    
    public CategoryService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task<ApiResponse<List<GetCategoryDetailsDto>>> GetCategories()
    {
        var categories = await _unitOfWork.CategoryRepository.GetParentCategories();

        return new ApiResponse<List<GetCategoryDetailsDto>> { Data = _mapper.Map<List<GetCategoryDetailsDto>>(categories)
            , Message = "Categories retrieved successfully." };
    }
    
    public async Task<ApiResponse<GetCategoryDto>> GetCategory(int id)
    {
        var category = await _unitOfWork.CategoryRepository.GetAsync(id);
        
        return category == null ? new ApiResponse<GetCategoryDto> { Success = false, Message = "Category not found." } 
            : new ApiResponse<GetCategoryDto> { Data = _mapper.Map<GetCategoryDto>(category),
                Message = "Category retrieved successfully." };
    }
    
    public async Task<ApiResponse<Category>> CreateCategory(CreateCategoryDto categoryCreateDto)
    {
        var categoryToCreate = _mapper.Map<CreateCategoryDto, Category>(categoryCreateDto);
        categoryToCreate.SKU = categoryToCreate.Title.ToLower().Replace(" ", "_");
        
        var createdCategory = await _unitOfWork.CategoryRepository.AddAsync(categoryToCreate);

        return new ApiResponse<Category> { Data = createdCategory, Message = "Category created successfully" };
    }
    
    public async Task<ApiResponse<Category>> UpdateCategory(int id, UpdateCategoryDto categoryUpdateDto)
    {
        Category categoryFromDb = await _unitOfWork.CategoryRepository.GetAsync(id);
        if (categoryFromDb == null)
            return new ApiResponse<Category> { Success = false, Message = "Category not found." };

        categoryFromDb = _mapper.Map(categoryUpdateDto, categoryFromDb);
        categoryFromDb.SKU = categoryFromDb.Title.ToLower().Replace(" ", "_");

        var updatedCategory = await _unitOfWork.CategoryRepository.UpdateAsync(categoryFromDb);

        return new ApiResponse<Category> { Data = updatedCategory, Message = "Category updated successfully" };
    }
    
    public async Task<ApiResponse<bool>> DeleteCategory(int id)
    {
        Category categoryFromDb = await _unitOfWork.CategoryRepository.GetAsync(id);
        if (categoryFromDb == null)
            return new ApiResponse<bool> { Success = false, Message = "Category not found." };

        var deletedCategory = await _unitOfWork.CategoryRepository.DeleteAsync(id);

        return !deletedCategory ? new ApiResponse<bool> { Success = false, Message = "Error occured while deleting category." } 
            : new ApiResponse<bool> { Message = "Category deleted successfully" };
    }
}