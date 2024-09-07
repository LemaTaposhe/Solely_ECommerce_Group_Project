using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.DAL.SpecificQuery;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Inventory;
using Microsoft.EntityFrameworkCore;

namespace IsDB_R57_Solely.DAL.Repositories
{
    public class PurchaseRepository : IPurchaseRepository
    {
        private readonly SolelyDbContext _context;

        public PurchaseRepository(SolelyDbContext context)
        {
            _context = context;
        }

        public Task<int> Count(ISpecification<Purchase> specification)
        {
            throw new NotImplementedException();
        }

        public async Task<object> Delete(int id)
        {
            var purchase = await _context.Purchases.FindAsync(id);
            if (purchase != null)
            {
                _context.Purchases.Remove(purchase);
                await _context.SaveChangesAsync();
            }
            return purchase;
        }

        public async Task<IReadOnlyList<Purchase>> Get()
        {
            return await _context.Purchases
                .Include(e => e.Product)
                .Include(e => e.Supplier)
                .ToListAsync();
        }

        public async Task<Purchase> Get(int id)
        {
            return await _context.Purchases
                .Include(e => e.Product)
                .Include(e => e.Supplier)
                .FirstOrDefaultAsync(p => p.PurchaseId == id);
        }

        public Task<Purchase> GetEntityWithSpec(ISpecification<Purchase> specification)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Purchase>> List(ISpecification<Purchase> specification)
        {
            throw new NotImplementedException();
        }

        public async Task<object> Post(Purchase entity)
        {
            var exStock = await _context.Stocks.SingleOrDefaultAsync(s=>s.ProductId== entity.ProductId); 
            if (exStock == null)
            {
                var newStock = new Stock
                {
                    ProductId = entity.ProductId,
                    Quantity = entity.PurchaseQuantity,
                    LastPurchaseDate = DateTime.Now
                };
                _context.Add(newStock);
            }
            else
            {
                exStock.Quantity += entity.PurchaseQuantity;
                _context.Entry(exStock).State = EntityState.Modified;
            }
            await _context.Purchases.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<object> Put(int id, Purchase entity)
        {
            var exentity = await _context.Purchases.FindAsync(id);

            if (exentity == null)
            {
                return null;
            }

            exentity.PurchaseDate = entity.PurchaseDate;
            exentity.PurchaseQuantity = entity.PurchaseQuantity;
            exentity.PurchasePrice = entity.PurchasePrice;

            await _context.SaveChangesAsync();

            return exentity;
        }

        public async Task<Stock> UpdateStockQuantity(int id, int quantity)
        {
            var existingEntity = await _context.Stocks
                .Where(s => s.ProductId == id)
                .FirstOrDefaultAsync();

            if (existingEntity == null)
            {
                return null;
            }

            existingEntity.Quantity += quantity;
            await _context.SaveChangesAsync();
            return existingEntity;
        }
    }
}
