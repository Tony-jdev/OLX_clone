namespace OLX_clone.Server.Models.Dtos;

public class PagedList<T>
{
    private PagedList(List<T> items, int page, int pageSize, int totalCount)
    {
        Items = items;
        Page = page;
        PageSize = pageSize;
        TotalCount = totalCount;
    }
    
    public List<T> Items { get; }
    
    public int Page { get; }
    
    public int PageSize { get; }
    
    public int TotalCount { get; }

    public bool HasNextPage => Page * PageSize < TotalCount;

    public bool HasPreviousPage => PageSize > 1 && Page != 1;

    public static async Task<PagedList<T>> CreateAsync(IEnumerable<T> items, int page, int pageSize)
    {
        int totalCount = items.Count();  
        var pagedItems = items.Skip((page - 1) * pageSize).Take(pageSize).ToList();
        return new(pagedItems, page, pageSize, totalCount);
    }
}