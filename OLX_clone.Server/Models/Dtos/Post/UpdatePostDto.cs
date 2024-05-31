﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models.Dtos.Post;

public class UpdatePostDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
    public double Price { get; set; }

    [Required]
    public string Type { get; set; }

    [Required]
    public int CategoryId { get; set; }

    [Required]
    public string Status { get; set; }

    public List<IFormFile>? Files { get; set; }
}