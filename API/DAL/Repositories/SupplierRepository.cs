using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.DAL.SpecificQuery;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Inventory;
using IsDB_R57_Solely.Entities.Orders;
using Microsoft.EntityFrameworkCore;

namespace IsDB_R57_Solely.DAL.Repositories
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly SolelyDbContext _context;

        public SupplierRepository(SolelyDbContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<Supplier>> Get()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public async Task<Supplier> Get(int id)
        {
            return await _context.Suppliers.FindAsync(id);
        }

        public async Task<object> Post(Supplier entity)
        {
            if(entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            _context.Suppliers.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<object> Put(int id, Supplier entity)
        {
            var existingSupplier = await _context.Suppliers.FindAsync(id);
            if (existingSupplier == null)
            {
                return null;
            }

            _context.Entry(existingSupplier).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<object> Delete(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null)
            {
                return null;
            }

            _context.Suppliers.Remove(supplier);
            await _context.SaveChangesAsync();
            return supplier;
        }

        public Task<Supplier> GetEntityWithSpec(ISpecification<Supplier> specification)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Supplier>> List(ISpecification<Supplier> specification)
        {
            throw new NotImplementedException();
        }

        public Task<int> Count(ISpecification<Supplier> specification)
        {
            throw new NotImplementedException();
        }
    }
}
