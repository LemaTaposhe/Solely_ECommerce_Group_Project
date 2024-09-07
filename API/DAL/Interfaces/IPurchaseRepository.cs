﻿using IsDB_R57_Solely.Entities.Inventory;

namespace IsDB_R57_Solely.DAL.Interfaces
{
    public interface IPurchaseRepository : IRepository<Purchase>
    {
        Task<Stock> UpdateStockQuantity(int id, int quantity);
    }
}
