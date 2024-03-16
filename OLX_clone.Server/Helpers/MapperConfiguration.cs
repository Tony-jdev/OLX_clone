using AutoMapper;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;

namespace OLX_clone.Server.Helpers;

public class MapperConfiguration : Profile
{
    public MapperConfiguration()
    {
        CreateMap<CreateCategoryDto, Category>();
    }
}