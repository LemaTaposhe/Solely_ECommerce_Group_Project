using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Data;
using Microsoft.EntityFrameworkCore;
using IsDB_R57_Solely.Entities.Products;
using Microsoft.Extensions.Hosting;
using IsDB_R57_Solely.DAL.SpecificQuery;

namespace IsDB_R57_Solely.DAL.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly SolelyDbContext _context;
        private readonly IWebHostEnvironment _environment;
        public ProductRepository(SolelyDbContext context,IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<object> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
            return product;
        }

        public async Task<IReadOnlyList<Product>> Get()
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Tag)
                .Include(p => p.Brand)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<Product>> List()
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Tag)
                .Include(p => p.Brand)
                .ToListAsync();
        }

        public async Task<Product> Get(int id)
        {
            return await _context.Set<Product>()
                .Include(p => p.Category)
                .Include(p => p.Tag)
                .Include(e=>e.Brand)
                .FirstOrDefaultAsync(p=>p.ProductId==id);
        }



        public async Task<object> Post(Product entity)
        {
            if( entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            if(entity.Image != null)
            {
                entity.ThumbnailImage=await UploadImageAsync(entity.Image);
            }

            _context.Products.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<object> Put(int id, Product entity)
        {
            var existingEntity = await _context.Products.FindAsync(id);
            

            if (entity.Image != null)
            {
                existingEntity.ThumbnailImage = await UploadImageAsync(entity.Image);
            }
            
            existingEntity.Name = entity.Name;
            existingEntity.Description = entity.Description;
            existingEntity.Price = entity.Price;
            existingEntity.CategoryId = entity.CategoryId;
            existingEntity.TagId = entity.TagId;
            existingEntity.BrandId = entity.BrandId;
            existingEntity.isActive = entity.isActive;

            _context.Entry(existingEntity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return existingEntity;
        }

        private async Task<string> UploadImageAsync(IFormFile imageFile)
        {
            string uploadsFolder = Path.Combine(_environment.WebRootPath, "ProductImage");
            string uniqueFileName = Guid.NewGuid().ToString() + "_" + imageFile.FileName;
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            var imgUrl = "http://localhost:5000/" + "ProductImage/" + uniqueFileName;

            return imgUrl;
        }

        private IQueryable<Product> ApplySpec(ISpecification<Product> spec)
        {
            return SpecificationEvaluator<Product>.GetQuery(_context.Products.AsQueryable(), spec);
        }

        public async Task<Product> GetEntityWithSpec(ISpecification<Product> specification)
        {
            return await ApplySpec(specification).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<Product>> List(ISpecification<Product> specification)
        {
            return await ApplySpec(specification).ToListAsync();
        }

        public async Task<int> Count(ISpecification<Product> specification)
        {
            return await ApplySpec(specification).CountAsync();
        }
    }
}
