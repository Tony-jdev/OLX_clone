using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Repositories.Contracts;

public interface IPostPhotoRepository: IGenericRepository<PostPhoto>
{
    Task<List<PostPhoto>> AddRangeAsync(List<PostPhoto> postPhotos);
    Task<List<PostPhoto>> GetPostPhotosByPostId(int postId);
    Task<List<string>> GetPostPhotosUrlByPostId(int postId);
    Task<string> GetFirstPostPhotoByPostId(int postId);
    Task<bool> DeleteRange(List<PostPhoto> postPhotos);
}