using AutoMapper;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos.Chat;
using OLX_clone.Server.Models.Dtos.ChatMessage;

namespace OLX_clone.Server.Services;

public class ChatService: IChatService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    
    public ChatService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task<ApiResponse<Chat>> CreateChatAsync(CreateChatDto chatCreateDto)
    {
        var chatToCreate = _mapper.Map<CreateChatDto, Chat>(chatCreateDto);

        var createdChat = await _unitOfWork.ChatRepository.AddAsync(chatToCreate);

        return new ApiResponse<Chat> { Data = createdChat, Message = "Chat created successfully" };
    }

    public async Task<ApiResponse<ChatMessage>> CreateChatMessageAsync(CreateChatMessageDto chatMessageCreateDto)
    {
        var chatMessageToCreate = _mapper.Map<CreateChatMessageDto, ChatMessage>(chatMessageCreateDto);

        var createdMessage = await _unitOfWork.ChatMessageRepository.AddAsync(chatMessageToCreate);

        return new ApiResponse<ChatMessage> { Data = createdMessage, Message = "Message created successfully" };
    }

    public async Task<ApiResponse<List<GetChatDto>>> GetChatsByUserIdAsync(string userId)
    {
        var chats = await _unitOfWork.ChatRepository.GetAllChatsByUserIdAsync(userId);
        var getChatDtos = _mapper.Map<List<GetChatDto>>(chats);

        foreach (var chat in getChatDtos)
        {
            var latestMessage = await _unitOfWork.ChatMessageRepository.GetLatestMessageByChatIdAsync(chat.Id);
            chat.LatestMessage = latestMessage;
        }

        return new ApiResponse<List<GetChatDto>> { Data = getChatDtos, Message = "Chats retrieved successfully." };
    }
    
    public async Task<ApiResponse<GetChatDetailsDto>> GetChatWithMessagesAsync(int id)
    {
        var chat = await _unitOfWork.ChatRepository.GetChatWithMessagesAsync(id);
        if (chat == null)
        {
            return new ApiResponse<GetChatDetailsDto> { Success = false, Message = "Chat not found." };
        }

        var chatToView = _mapper.Map<Chat, GetChatDetailsDto>(chat);
        
        return new ApiResponse<GetChatDetailsDto> { Data = chatToView, Message = "Chat retrieved successfully." };
    }
}