﻿using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.DataAccessLayer.Repositories;

public class UnitOfWork: IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private bool _disposed;

    public ICategoryRepository CategoryRepository { get; }
    public IPostRepository PostRepository { get; }
    public IPostViewRepository PostViewRepository { get; }
    public IPostPhotoRepository PostPhotoRepository { get; }
    public IChatRepository ChatRepository { get; }
    public IChatMessageRepository ChatMessageRepository { get; }
    public ITransactionRepository TransactionRepository { get; }
    public IBoostPackageRepository BoostPackageRepository { get; }
    public IPostBoostRepository PostBoostRepository { get; }
    public IFavoriteRepository FavoriteRepository { get; }

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
        CategoryRepository = new CategoryRepository(_context);
        PostRepository = new PostRepository(_context);
        PostViewRepository = new PostViewRepository(_context);
        PostPhotoRepository = new PostPhotoRepository(_context);
        ChatRepository = new ChatRepository(_context);
        ChatMessageRepository = new ChatMessageRepository(_context);
        TransactionRepository = new TransactionRepository(_context);
        BoostPackageRepository = new BoostPackageRepositoory(_context);
        PostBoostRepository = new PostBoostRepository(_context);
        FavoriteRepository = new FavoriteRepository(_context);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        if (!_disposed)
        {
            _context.Dispose();
            _disposed = true;
        }
    }
}