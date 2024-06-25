using AutoMapper;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.Auth;
using OLX_clone.DataAccessLayer.Models.Dtos.BoostPackage;
using OLX_clone.DataAccessLayer.Models.Dtos.Category;
using OLX_clone.DataAccessLayer.Models.Dtos.Chat;
using OLX_clone.DataAccessLayer.Models.Dtos.ChatMessage;
using OLX_clone.DataAccessLayer.Models.Dtos.Favorite;
using OLX_clone.DataAccessLayer.Models.Dtos.Post;
using OLX_clone.DataAccessLayer.Models.Dtos.User;

namespace OLX_clone.Server;

public class MapperConfiguration : Profile
{
    public MapperConfiguration()
    {
        CreateMap<CreateCategoryDto, Category>();
        CreateMap<UpdateCategoryDto, Category>();
        CreateMap<Category, GetCategoryDto>();
        CreateMap<Category, GetCategoryDetailsDto>();
        
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
        CreateMap<UpdateApplicationUserDto, ApplicationUser>();

        CreateMap<BoostPackage, GetBoostPackageDto>();
        CreateMap<BoostPackage, GetBoostPackageDetailsDto>();
        CreateMap<CreateBoostPackageDto, BoostPackage>();
        CreateMap<UpdateBoostPackageDto, BoostPackage>();

        CreateMap<Favorite, GetFavoriteDto>();
        CreateMap<AddFavoriteDto, Favorite>();
    }
}