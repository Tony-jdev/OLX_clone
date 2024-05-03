using OLX_clone.Server.Helpers;
using OLX_clone.Server.Models;

namespace OLX_clone.Server.Services.TransactionService;

public interface ITransactionService
{
    Task<ApiResponse<Transaction>> RecordTransaction(Transaction transaction);
}