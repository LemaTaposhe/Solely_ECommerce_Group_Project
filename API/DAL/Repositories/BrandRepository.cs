using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.DAL.SpecificQuery;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Products;
using Microsoft.EntityFrameworkCore;

namespace IsDB_R57_Solely.DAL.Repositories
{
    public class BrandRepository : IBrandRepository
    {

        public readonly SolelyDbContext _context;
        public BrandRepository(SolelyDbContext context)
        {
            _context = context;
        }

        public Task<int> Count(ISpecification<Brand> specification)
        {
            throw new NotImplementedException();
        }

        public async Task<object> Delete(int id)
        {
            var brand = await _context.Brands.FindAsync(id);
            if (brand != null)
            {
                _context.Brands.Remove(brand);
                await _context.SaveChangesAsync();
            }
            return brand;
        }

        public async Task<IReadOnlyList<Brand>> Get()
        {
            return await _context.Set<Brand>().ToListAsync();
        }

        //public async Task<Brand> Get(int id)
        //{
        //    return await _context.Set<Brand>().FirstAsync();
        //}

        public async Task<Brand> Get(int id)
        {
            var brand = await _context.Brands.FindAsync(id);
            return brand;
        }

        public Task<Brand> GetEntityWithSpec(ISpecification<Brand> specification)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Brand>> List(ISpecification<Brand> specification)
        {
            throw new NotImplementedException();
        }

        public async Task<object> Post(Brand entity)
        {
            
            _context.Brands.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<object> Put(int id, Brand entity)
        {
            var brand = _context.Brands.Find(id);
            if (brand == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            if (_context.Brands.Any(c => c.BrandId != id && c.Name == entity.Name))
            {
                return null;
            }
            brand.Name = entity.Name;
            brand.isActive = entity.isActive;
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
