﻿namespace OLX_clone.Server.Data.Contracts;

public interface IUnitOfWork: IDisposable
{
    ICategoryRepository CategoryRepository { get; }
    IPostRepository PostRepository { get; }
    IPostViewRepository PostViewRepository { get; }
    IPostPhotoRepository PostPhotoRepository { get; }

    Task<int> SaveChangesAsync();
}