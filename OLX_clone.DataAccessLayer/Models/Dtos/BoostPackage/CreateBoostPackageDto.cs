﻿using System.ComponentModel.DataAnnotations;

namespace OLX_clone.DataAccessLayer.Models.Dtos.BoostPackage;

public class CreateBoostPackageDto
{
    [Required]
    public string Name { get; set; }

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
    public double Price { get; set; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Boost count must be at least 1.")]
    public int BoostCount { get; set; }

    [Required]
    public BoostType Type { get; set; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Number of days must be at least 1.")]
    public int NumberOfDays { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Top duration in days must be non-negative.")]
    public int TopDurationInDays { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "VIP duration in days must be non-negative.")]
    public int VipDurationInDays { get; set; }
}