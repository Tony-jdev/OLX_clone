using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.BusinessLogicLayer.Services;

public class BoostExpirationService : IBoostExpirationService
{
    private readonly IUnitOfWork _unitOfWork;

    public BoostExpirationService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task CheckBoostExpiration()
    {
        try
        {
            var expiredBoosts = await _unitOfWork.PostBoostRepository.GetExpiredBoostsAsync();

            foreach (var boost in expiredBoosts)
            {
                var post = await _unitOfWork.PostRepository.GetAsync(boost.PostId);
                if (post != null)
                {
                    if (boost.TopExpiryDate.HasValue && boost.TopExpiryDate.Value <= DateTime.Now)
                        post.IsTop = false;
                    if (boost.VipExpiryDate.HasValue && boost.VipExpiryDate.Value <= DateTime.Now)
                        post.IsVip = false;

                    await _unitOfWork.PostRepository.UpdateAsync(post);
                }
            }
        }
        catch (Exception ex)
        {
        }
    }
}