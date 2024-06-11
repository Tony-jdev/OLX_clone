using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.BusinessLogicLayer.Services.Contracts;

public interface ITransactionService
{
    Task<ApiResponse<Transaction>> RecordTransaction(Transaction transaction);
}