using IsDB_R57_Solely.DAL.DTOs;
using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.DAL.SpecificQuery;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Products;
using IsDB_R57_Solely.HelperAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace IsDB_R57_Solely.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        public IProductRepository _irepo;
        public SolelyDbContext _context;
        public IWebHostEnvironment _environment;
        public ProductsController(IProductRepository repository, SolelyDbContext context, IWebHostEnvironment environment)
        {
            _irepo = repository;
            _context = context;
            _environment = environment;
        }

        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<Product>>> Index()
        {
            var products = await _context.Products
            .Select(p => new
            {
                Product = p,
                Brand = p.Brand,
                Category = p.Category,
                Tag = p.Tag,
                Stock = _context.Stocks
                    .Where(s => s.ProductId == p.ProductId)
                    .FirstOrDefault()
            })
            .ToListAsync();

            var data = products.Select(p => Mapper.MapProductToProductDTO(p.Product, p.Stock)).ToList();

            return Ok(data);
        }

        [HttpGet]
        [Route("GetProduct")]
        public async Task<ActionResult<Product>> Get()
        {
            {
                var products = await _context.Products
                .Select(p => new
                {
                    Product = p,
                    Brand = p.Brand,
                    Category = p.Category,
                    Tag = p.Tag,
                    Stock = _context.Stocks
                        .Where(s => s.ProductId == p.ProductId)
                        .FirstOrDefault()
                })
                .ToListAsync();

                var data = products.Select(p => Mapper.MapProductToProductDTO(p.Product, p.Stock)).ToList();

                return Ok(data);
            }

        }

        [HttpGet]
        [Route("GetProducts/{id}")]
        public async Task<ActionResult<ProductDTO>> Get(int id)
        {
            var spec = new SpecificProduct(id);

            var product = await _irepo.GetEntityWithSpec(spec);
            if (product == null)
            {
                return NotFound();
            }

            var stock = await _context.Stocks
                .Where(s => s.ProductId == id)
                .FirstOrDefaultAsync();

            var productDTO = Mapper.MapProductToProductDTO(product, stock);
            return Ok(productDTO);
        }

        [HttpPost]
        [Route("Post")]
        public async Task<ActionResult> Post([FromForm] Product product)
        {
            if(ModelState.IsValid)
            {
               var products = await _irepo.Post(product);
                return Ok(products);
            }
            return BadRequest();
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
        [HttpPut]
        [Route("Put/{id}")]
        public async Task<ActionResult> Put(int id,Product product)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _irepo.Put(id, product);
            return Ok(product);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var data = await _irepo.Delete(id);
            if (data != null)
            {
                return RedirectToRoute("Index");
            }
            return Content("product does not exists...");
        }
    }
}
