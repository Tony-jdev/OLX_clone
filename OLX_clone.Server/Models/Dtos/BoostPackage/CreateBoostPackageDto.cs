﻿using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models.Dtos.BoostPackage;

public class CreateBoostPackageDto
{
    public string Name { get; set; }
    public double Price { get; set; }
    public int BoostCount { get; set; }
    public string  Type { get; set; }
    public int NumberOfDays { get; set; }
    public int TopDurationInDays { get; set; }
    public int VipDurationInDays { get; set; }
}