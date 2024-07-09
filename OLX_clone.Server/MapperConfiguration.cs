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
        CreateMap<Post, GetPostProfileDto>();
        CreateMap<Post, GetRecentlySoldPostDto>();
        CreateMap<Post, GetFavoritePostDto>();
        
        CreateMap<RegisterRequestDto, ApplicationUser>()
            .ForMember(dest => dest.UserName,
                opt => opt.MapFrom(src => src.Email));
        
        CreateMap<CreateChatDto, Chat>();
        CreateMap<CreateChatMessageDto, ChatMessage>();
        CreateMap<Chat, GetChatDetailsDto>()
            .ForMember(dto => dto.Name, conf => conf.MapFrom(chat => chat.Post.Title))
            .ForMember(dto => dto.PostPrice, conf => conf.MapFrom(chat => chat.Post.Price));
        CreateMap<Chat, GetChatDto>()
            .ForMember(dto => dto.Name, conf => conf.MapFrom(chat => chat.Post.Title));
        CreateMap<ChatMessage, GetChatMessageDto>();

        CreateMap<ApplicationUser, GetApplicationUserDto>();
        CreateMap<ApplicationUser, GetApplicationUserChatDto>();
        CreateMap<ApplicationUser, GetApplicationUserDetailsDto>()
            .ForMember(dest => dest.UserId,
                opt => opt.MapFrom(src => src.Id));
        CreateMap<UpdateApplicationUserDto, ApplicationUser>();
        CreateMap<UpdateApplicationUserAdditionalDto, ApplicationUser>();

        CreateMap<BoostPackage, GetBoostPackageDto>();
        CreateMap<BoostPackage, GetBoostPackageDetailsDto>();
        CreateMap<CreateBoostPackageDto, BoostPackage>();
        CreateMap<UpdateBoostPackageDto, BoostPackage>();

        CreateMap<Favorite, GetFavoriteDto>();
        CreateMap<AddFavoriteDto, Favorite>();
    }
}