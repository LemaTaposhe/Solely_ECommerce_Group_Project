//using IsDB_R57_Solely.DAL.Interfaces;
//using IsDB_R57_Solely.Data;
//using IsDB_R57_Solely.Entities.Products;
//using Microsoft.EntityFrameworkCore;

//namespace IsDB_R57_Solely.DAL.Repositories
//{
//    public class ProductCategoryRepository /*: IProductCategoryRepository*/
//    {
//        public readonly SolelyDbContext _context;
//        public ProductCategoryRepository(SolelyDbContext context)
//        {
//            _context = context;
//        }
//        public async Task<object> Delete(int id)
//        {         
//            var pc= await _context.ProductCategories.FindAsync(id);
//            if (pc != null)
//            {
//                _context.ProductCategories.Remove(pc);
//                await _context.SaveChangesAsync();
//            }
//            return pc;
//        }

//        public async Task<IEnumerable<ProductCategory>> Get()
//        {
//            return await _context.Set<ProductCategory>().ToListAsync();
//        }

//        public async Task<ProductCategory> Get(int id)
//        {
//            return await _context.Set<ProductCategory>().FirstAsync();
//        }

//        public async Task<object> Post(ProductCategory entity)
//        {
//            _context.ProductCategories.Add(entity);
//            await _context.SaveChangesAsync();
//            return entity;
//        }

//        public async Task<object> Put(int id, ProductCategory entity)
//        {
//            _context.Entry(entity).State = EntityState.Modified;
//            await _context.SaveChangesAsync();
//            return entity;
//        }
//    }
//}
