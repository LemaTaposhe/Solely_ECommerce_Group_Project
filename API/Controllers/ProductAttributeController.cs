using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Entities.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IsDB_R57_Solely.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    //public class ProductAttributeController : ControllerBase
    //{
    //    private readonly IProductAttributeRepository _productAttributeRepository;

    //    public ProductAttributeController(IProductAttributeRepository productAttributeRepository)
    //    {
    //        _productAttributeRepository = productAttributeRepository;
    //    }

    //    // GET: api/ProductAttribute
    //    [HttpGet]
    //    public async Task<ActionResult<IEnumerable<ProductAttribute>>> GetProductAttributes()
    //    {
    //        var productAttributes = await _productAttributeRepository.Get();
    //        return Ok(productAttributes);
    //    }

    //    // GET: api/ProductAttribute/5
    //    [HttpGet("{id}")]
    //    public async Task<ActionResult<ProductAttribute>> GetProductAttribute(int id)
    //    {
    //        var productAttribute = await _productAttributeRepository.Get(id);

    //        if (productAttribute == null)
    //        {
    //            return NotFound();
    //        }

    //        return Ok(productAttribute);
    //    }

    //    // POST: api/ProductAttribute
    //    [HttpPost]
    //    public async Task<ActionResult<ProductAttribute>> PostProductAttribute(ProductAttribute productAttribute)
    //    {
    //        var createdProductAttribute = await _productAttributeRepository.Post(productAttribute);

    //        if (createdProductAttribute == null)
    //        {
    //            return BadRequest("A Product Attribute with the same name already exists.");
    //        }

    //        return CreatedAtAction(nameof(GetProductAttribute), new { id = productAttribute.ProductAttributeId }, productAttribute);
    //    }

    //    // PUT: api/ProductAttribute/5
    //    [HttpPut("{id}")]
    //    public async Task<IActionResult> PutProductAttribute(int id, ProductAttribute productAttribute)
    //    {
    //        if (id != productAttribute.ProductAttributeId)
    //        {
    //            return BadRequest("Product Attribute ID mismatch.");
    //        }

    //        var updatedProductAttribute = await _productAttributeRepository.Put(id, productAttribute);

    //        if (updatedProductAttribute == null)
    //        {
    //            return NotFound();
    //        }

    //        return NoContent();
    //    }

    //    // DELETE: api/ProductAttribute/5
    //    [HttpDelete("{id}")]
    //    public async Task<IActionResult> DeleteProductAttribute(int id)
    //    {
    //        var deletedProductAttribute = await _productAttributeRepository.Delete(id);

    //        if (deletedProductAttribute == null)
    //        {
    //            return NotFound();
    //        }

    //        return NoContent();
    //    }
    //}
}
