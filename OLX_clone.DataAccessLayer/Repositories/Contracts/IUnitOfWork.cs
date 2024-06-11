namespace OLX_clone.DataAccessLayer.Repositories.Contracts;

public interface IUnitOfWork: IDisposable
{
    ICategoryRepository CategoryRepository { get; }
    IPostRepository PostRepository { get; }
    IPostViewRepository PostViewRepository { get; }
    IPostPhotoRepository PostPhotoRepository { get; }
    IChatRepository ChatRepository { get; }
    IChatMessageRepository ChatMessageRepository { get; }
    ITransactionRepository TransactionRepository { get; }
    IBoostPackageRepository BoostPackageRepository { get; }
    IPostBoostRepository PostBoostRepository { get; }

    Task<int> SaveChangesAsync();
}