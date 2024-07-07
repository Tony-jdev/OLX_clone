using OLX_clone.DataAccessLayer.Models.Enums;

namespace OLX_clone.DataAccessLayer.Models.Dtos.User;

public class UpdateApplicationUserAdditionalDto
{
    public string Id { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public Gender? Gender { get; set; }
    public MaritalStatus? MaritalStatus { get; set; }
    public bool? HasChildren { get; set; }
    public bool? HasPets { get; set; }
    public bool? IsStudying { get; set; }
    public bool? IsWorking { get; set; }
}