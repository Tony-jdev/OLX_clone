using System.ComponentModel.DataAnnotations.Schema;

namespace OLX_clone.Server.Models;

public class BoostPackage
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public int BoostCount { get; set; }
    [Column(TypeName = "nvarchar(50)")]
    public BoostType Type { get; set; }
    public int NumberOfDays { get; set; }
    public int TopDurationInDays { get; set; }
    public int VipDurationInDays { get; set; }
}


public enum BoostType
{
    Top,
    VIP
}