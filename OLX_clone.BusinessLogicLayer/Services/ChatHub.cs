﻿using Microsoft.AspNetCore.SignalR;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Models.Dtos.ChatMessage;

namespace OLX_clone.BusinessLogicLayer.Services;

public class ChatHub : Hub
{
    private readonly IChatService _chatService;

    public ChatHub(IChatService chatService)
    {
        _chatService = chatService;
    }

    public async Task SendMessage(CreateChatMessageDto messageDto)
    {
        var result = await _chatService.CreateChatMessageAsync(messageDto);
        
        if (result.Success)
        {
            await Clients.Group(messageDto.ChatId.ToString()).SendAsync("ReceiveMessage", result.Data);
        }
    }

    public async Task JoinChatGroup(int chatId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
    }
}