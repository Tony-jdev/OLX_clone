using AutoMapper;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos;
using OLX_clone.Server.Models.Dtos.Auth;
using OLX_clone.Server.Models.Dtos.BoostPackage;
using OLX_clone.Server.Models.Dtos.Category;
using OLX_clone.Server.Models.Dtos.Chat;
using OLX_clone.Server.Models.Dtos.ChatMessage;
using OLX_clone.Server.Models.Dtos.Post;
using OLX_clone.Server.Models.Dtos.User;

namespace OLX_clone.Server.Helpers;

public class MapperConfiguration : Profile
{
    public MapperConfiguration()
    {
        CreateMap<CreateCategoryDto, Category>();
        CreateMap<UpdateCategoryDto, Category>();
        CreateMap<Category, GetCategoryDto>();
        
        CreateMap<CreatePostDto, Post>();
        CreateMap<UpdatePostDto, Post>();
        CreateMap<Post, GetPostDto>();
        CreateMap<Post, GetPostDetailsDto>();
        
        CreateMap<RegisterRequestDto, ApplicationUser>()
            .ForMember(dest => dest.UserName,
                opt => opt.MapFrom(src => src.Email));
        
        CreateMap<CreateChatDto, Chat>();
        CreateMap<Chat, GetChatDetailsDto>();
        CreateMap<Chat, GetChatDto>();
        CreateMap<ChatMessage, GetChatMessageDto>();

        CreateMap<ApplicationUser, GetApplicationUserDto>();

        CreateMap<BoostPackage, GetBoostPackageDto>();
        CreateMap<BoostPackage, GetBoostPackageDetailsDto>();
        CreateMap<CreateBoostPackageDto, BoostPackage>();
        CreateMap<UpdateBoostPackageDto, BoostPackage>();
    }
}