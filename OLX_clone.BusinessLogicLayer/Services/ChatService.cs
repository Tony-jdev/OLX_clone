using AutoMapper;
using OLX_clone.BusinessLogicLayer.Middleware.Exceptions;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.Chat;
using OLX_clone.DataAccessLayer.Models.Dtos.ChatMessage;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.BusinessLogicLayer.Services;

public class ChatService : IChatService
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
        if (chats == null || chats.Count == 0)
        {
            throw new NotFoundException("No chats found for this user.");
        }

        var getChatDtos = _mapper.Map<List<GetChatDto>>(chats);

        foreach (var chat in getChatDtos)
        {
            var latestMessage = await _unitOfWork.ChatMessageRepository.GetLatestMessageByChatIdAsync(chat.Id);
            chat.LatestMessage = _mapper.Map<GetChatMessageDto>(latestMessage);
        }

        return new ApiResponse<List<GetChatDto>> { Data = getChatDtos, Message = "Chats retrieved successfully." };
    }

    public async Task<ApiResponse<GetChatDetailsDto>> GetChatWithMessagesAsync(int id)
    {
        var chat = await _unitOfWork.ChatRepository.GetChatWithMessagesAsync(id);
        if (chat == null)
        {
            throw new NotFoundException("Chat not found.");
        }

        var chatToView = _mapper.Map<Chat, GetChatDetailsDto>(chat);

        return new ApiResponse<GetChatDetailsDto> { Data = chatToView, Message = "Chat retrieved successfully." };
    }

    public async Task<ApiResponse<GetChatDetailsDto>> GetChatWithMessagesByParticipantsAsync(string senderId, string receiverId)
    {
        var chat = await _unitOfWork.ChatRepository.GetChatWithMessagesByParticipantsAsync(senderId, receiverId);
        if (chat == null)
        {
            throw new NotFoundException("Chat not found.");
        }

        var chatToView = _mapper.Map<Chat, GetChatDetailsDto>(chat);

        return new ApiResponse<GetChatDetailsDto> { Data = chatToView, Message = "Chat retrieved successfully." };
    }

    public async Task<ApiResponse<bool>> MarkMessagesAsRead(List<int> messageIds)
    {
        try
        {
            var messages = await _unitOfWork.ChatMessageRepository.GetMessagesByIdsAsync(messageIds);
            if (messages == null || messages.Count == 0)
            {
                throw new NotFoundException("No messages found with the provided IDs.");
            }

            foreach (var message in messages)
            {
                message.IsRead = true;
            }

            await _unitOfWork.SaveChangesAsync();

            return new ApiResponse<bool> { Success = true, Message = "Messages marked as read successfully" };
        }
        catch (Exception ex)
        {
            throw new InternalServerErrorException($"Failed to mark messages as read: {ex.Message}");
        }
    }
}