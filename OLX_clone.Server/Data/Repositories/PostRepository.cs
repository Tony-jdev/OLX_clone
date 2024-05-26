﻿using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Data.Repositories;

public class PostRepository : GenericRepository<Post>, IPostRepository
{
    public PostRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<List<Post>> GetVipPostsAsync()
    {
        return await _context.Posts
            .Where(p => p.IsVip && p.Status == SD.status_active)
            .OrderBy(p => Guid.NewGuid())
            .Take(20)
            .ToListAsync();
    }

    public async Task<List<Post>> GetPostsByUserIdAsync(string userId)
    {
        return await _context.Posts
            .Where(p => p.ApplicationUserId == userId)
            .ToListAsync();
    }

    public async Task<List<Post>> GetAllAsync(string? searchTerm, string? orderBy, string? status)
    {
        var query = BuildQuery(null, searchTerm, orderBy, status);
        return await ExecuteQueryAsync(query, orderBy);
    }

    public async Task<List<Post>> GetAllByCategoryAsync(List<int> categoryIds, string? searchTerm, string? orderBy, string? status)
    {
        var query = BuildQuery(categoryIds, searchTerm, orderBy, status);
        return await ExecuteQueryAsync(query, orderBy);
    }

    public async Task<Post> GetPostDetailsBySkuAsync(string sku)
    {
        return await _context.Posts
            .Include(p => p.User)
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.SKU == sku);
    }

    private IQueryable<Post> BuildQuery(List<int>? categoryIds, string? searchTerm, string? orderBy, string? status)
    {
        IQueryable<Post> query = _context.Posts;

        if (categoryIds != null && categoryIds.Any())
        {
            query = query.Where(p => categoryIds.Contains(p.CategoryId));
        }

        if (!string.IsNullOrEmpty(status))
        {
            query = query.Where(p => p.Status == status.ToLower());
        }
        else
        {
            query = query.Where(p => p.Status == SD.status_active);
        }

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(p => p.Title.Contains(searchTerm.ToLower()));
        }

        if (!string.IsNullOrEmpty(orderBy))
        {
            switch (orderBy.ToLower())
            {
                case "asc":
                    query = query.OrderBy(p => p.Price);
                    break;
                case "desc":
                    query = query.OrderByDescending(p => p.Price);
                    break;
                default:
                    query = query.OrderBy(p => p.Id);
                    break;
            }
        }

        return query;
    }

    private async Task<List<Post>> ExecuteQueryAsync(IQueryable<Post> query, string? orderBy)
    {
        if (string.IsNullOrEmpty(orderBy))
        {
            query = query.OrderBy(p => Guid.NewGuid());
        }

        var topPosts = await query.Where(p => p.IsTop)
                                  .Take(4)
                                  .ToListAsync();

        var topPostIds = topPosts.Select(p => p.Id).ToList();

        var remainingPosts = await query.Where(p => !topPostIds.Contains(p.Id))
                                        .ToListAsync();

        return topPosts.Concat(remainingPosts).ToList();
    }
}