using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories.CategoryRepository;

public class CategoryRepository
{
    private readonly ApplicationDbContext _context;

    public CategoryRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Category>> GetCategories()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<Category> GetCategory(int id)
    {
        return await _context.Categories.FindAsync(id);
    }
    public async Task<Category> CreateCategory(Category category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return category;
    }
    public async Task<Category> UpdateCategory(Category category)
    {
        _context.Categories.Update(category);
        await _context.SaveChangesAsync();
        return category;
    }
    public async Task<bool> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return false;
        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
        return true;
    }
}