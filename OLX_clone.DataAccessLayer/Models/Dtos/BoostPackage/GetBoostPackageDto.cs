namespace OLX_clone.DataAccessLayer.Models.Dtos.BoostPackage;

public class GetBoostPackageDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public int BoostCount { get; set; }
    public string Type { get; set; }
    public int NumberOfDays { get; set; }
    public int TopDurationInDays { get; set; }
    public int VipDurationInDays { get; set; }
}