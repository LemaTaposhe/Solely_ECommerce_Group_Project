using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.DAL.SpecificQuery;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Products;
using Microsoft.EntityFrameworkCore;

namespace IsDB_R57_Solely.DAL.Repositories
{
    public class TagRepository:ITagRepository
    {
        readonly SolelyDbContext _context;
        public TagRepository(SolelyDbContext context)
        {
            _context = context;
        }

        public Task<int> Count(ISpecification<Tag> specification)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyList<Tag>> Get()
        {
            return await _context.Tags.ToListAsync();
        }

        public async Task<Tag> Get(int id)
        {
            var tag = await _context.Tags.FindAsync(id);
            return tag;
        }

        public async Task<object> Post(Tag entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            if (_context.Tags.Any(c => c.Name == entity.Name))
            {
                return null;
            }

            _context.Tags.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<object> Put(int id, Tag entity)
        {
            var tag = _context.Tags.Find(id);
            if (tag == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            if (_context.Tags.Any(c => c.TagId != id && c.Name == entity.Name))
            {
                return null;
            }
            tag.Name = entity.Name;
            tag.isActive = entity.isActive;
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<object> Delete(int id)
        {
            var tag = _context.Tags.Find(id);
            if (tag != null)
            {
                _context.Tags.Remove(tag);
                await _context.SaveChangesAsync();
                return tag;
            }
            return null;
        }

        public Task<Tag> GetEntityWithSpec(ISpecification<Tag> specification)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Tag>> List(ISpecification<Tag> specification)
        {
            throw new NotImplementedException();
        }
    }
}
