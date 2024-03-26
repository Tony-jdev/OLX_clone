﻿namespace OLX_clone.Server.Models.Dtos.Post;

public class GetPostDetailsDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public string Status { get; set; }
    public ApplicationUser User { get; set; }
    public DateTime CreatedAt{ get; set; }
    public int ViewsCount { get; set; }
}