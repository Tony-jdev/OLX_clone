using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Data.Repositories.GenericRepositor;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories;

public class PostPhotoRepository: GenericRepository<PostPhoto>, IPostPhotoRepository
{
    public PostPhotoRepository(ApplicationDbContext context) : base(context)
    {
      
    }
    
    public async Task<List<PostPhoto>> AddRangeAsync(List<PostPhoto> postPhotos)
    {
        await _context.PostPhotos.AddRangeAsync(postPhotos);
        await _context.SaveChangesAsync();
        return postPhotos;
    }
    
    public async Task<List<string>> GetPostPhotosUrlByPostId(int postId)
    {
        return await _context.PostPhotos.Where(ph => ph.PostId == postId).
            Select(ph => ph.PhotoUrl).ToListAsync();
    }
    
    public async Task<List<PostPhoto>> GetPostPhotosByPostId(int postId)
    {
        return await _context.PostPhotos.Where(ph => ph.PostId == postId).ToListAsync();
    }
    
    public async Task<string> GetFirstPostPhotoByPostId(int postId)
    {
        return await _context.PostPhotos.Where(ph => ph.PostId == postId).Select(ph => ph.PhotoUrl).FirstOrDefaultAsync();
    }
    
    public async Task<bool> DeleteRange(List<PostPhoto> postPhotos)
    {
        _context.PostPhotos.RemoveRange(postPhotos);
        await _context.SaveChangesAsync();
        return true;
    }
}