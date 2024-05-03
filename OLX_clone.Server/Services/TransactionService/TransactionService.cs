using AutoMapper;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Data.Repositories;
using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;
using OLX_clone.Server.Models.Dtos.Payment;

namespace OLX_clone.Server.Services.TransactionService;

public class TransactionService : ITransactionService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public TransactionService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ApiResponse<Transaction>> RecordTransaction(Transaction transaction)
    {
        try
        {
            var result = await _unitOfWork.TransactionRepository.AddAsync(transaction);
            
            return new ApiResponse<Transaction> { Data = result, Success = true, Message = "Transaction recorded successfully." };
        }
        catch (Exception ex)
        {
            return new ApiResponse<Transaction> { Success = false, Message = $"Failed to record transaction: {ex.Message}" };
        }
    }
}