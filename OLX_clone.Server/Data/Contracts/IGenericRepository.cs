﻿namespace OLX_clone.Server.Data.Contracts;

public interface IGenericRepository<T> where T : class
{
    Task<List<T>> GetAllAsync();
    Task<T> GetAsync(int? id);
    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task<bool>  DeleteAsync(int id);
    Task<bool> Exists(int id);
}
