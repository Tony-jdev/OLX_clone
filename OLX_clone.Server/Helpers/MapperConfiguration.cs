using AutoMapper;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;
using OLX_clone.Server.Models.Dtos.Post;

namespace OLX_clone.Server.Helpers;

public class MapperConfiguration : Profile
{
    public MapperConfiguration()
    {
        CreateMap<CreateCategoryDto, Category>();
        CreateMap<UpdateCategoryDto, Category>();
        CreateMap<CreatePostDto, Post>();
        CreateMap<UpdatePostDto, Post>();
    }
}