using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.DAL.SpecificQuery;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Products;
using Microsoft.EntityFrameworkCore;

namespace IsDB_R57_Solely.DAL.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        readonly SolelyDbContext _context;
        public CategoryRepository(SolelyDbContext context)
        {
            _context = context;
        }

        public Task<int> Count(ISpecification<Category> specification)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyList<Category>> Get()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> Get(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            return category;
        }

        public async Task<object> Post(Category entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            if (_context.Categories.Any(c => c.Name == entity.Name))
            {
                return null;
            }

            _context.Categories.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<object> Put(int id, Category entity)
        {
            var category = _context.Categories.Find(id);
            if (category == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            if (_context.Categories.Any(c => c.CategoryId != id && c.Name == entity.Name))
            {
                return null;
            }
            category.Name = entity.Name;
            category.isActive = entity.isActive;
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<object> Delete(int id)
        {
            var category = _context.Categories.Find(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
                return category;
            }
            return null;
        }

        public Task<Category> GetEntityWithSpec(ISpecification<Category> specification)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Category>> List(ISpecification<Category> specification)
        {
            throw new NotImplementedException();
        }
    }
}
