using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.DAL.SpecificQuery;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Products;
using Microsoft.EntityFrameworkCore;

namespace IsDB_R57_Solely.DAL.Repositories
{
    //public class ProductAttributeRepository:IProductAttributeRepository
    //{
    //    readonly SolelyDbContext _context;
    //    public ProductAttributeRepository(SolelyDbContext context)
    //    {
    //        _context = context;
    //    }

    //    public Task<int> Count(ISpecification<ProductAttribute> specification)
    //    {
    //        throw new NotImplementedException();
    //    }

    //    public async Task<IReadOnlyList<ProductAttribute>> Get()
    //    {
    //        return await _context.ProductAttributes.ToListAsync();
    //    }

    //    public async Task<ProductAttribute> Get(int id)
    //    {
    //        var productAtt = await _context.ProductAttributes.FindAsync(id);
    //        return productAtt;
    //    }

    //    public async Task<object> Post(ProductAttribute entity)
    //    {
    //        if (entity == null)
    //        {
    //            throw new ArgumentNullException(nameof(entity));
    //        }

    //        if (_context.ProductAttributes.Any(c => c.Name == entity.Name))
    //        {
    //            return null;
    //        }

    //        _context.ProductAttributes.Add(entity);
    //        await _context.SaveChangesAsync();
    //        return entity;
    //    }

    //    public async Task<object> Put(int id, ProductAttribute entity)
    //    {
    //        var productAtt = _context.ProductAttributes.Find(id);
    //        if (productAtt == null)
    //        {
    //            throw new ArgumentNullException(nameof(entity));
    //        }

    //        _context.Entry(productAtt).CurrentValues.SetValues(entity);
    //        await _context.SaveChangesAsync();
    //        return entity;
    //    }

    //    public async Task<object> Delete(int id)
    //    {
    //        var productAtt = _context.ProductAttributes.Find(id);
    //        if (productAtt != null)
    //        {
    //            _context.ProductAttributes.Remove(productAtt);
    //            await _context.SaveChangesAsync();
    //            return productAtt;
    //        }
    //        return null;
    //    }

    //    public Task<ProductAttribute> GetEntityWithSpec(ISpecification<ProductAttribute> specification)
    //    {
    //        throw new NotImplementedException();
    //    }

    //    public Task<IReadOnlyList<ProductAttribute>> List(ISpecification<ProductAttribute> specification)
    //    {
    //        throw new NotImplementedException();
    //    }
    //}
}
