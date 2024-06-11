using AutoMapper;
using OLX_clone.BusinessLogicLayer.Middleware.Exceptions;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Repositories.Contracts;

namespace OLX_clone.BusinessLogicLayer.Services;

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
        var result = await _unitOfWork.TransactionRepository.AddAsync(transaction);
        
        if (result == null)
        {
            throw new InternalServerErrorException("Failed to record transaction.");
        }
        
        return new ApiResponse<Transaction> { Data = result, Success = true, Message = "Transaction recorded successfully." };
    }
}
