using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Entities.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace IsDB_R57_Solely.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _brandRepository;

        public BrandController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var brands = await _brandRepository.Get();
            return Ok(brands);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var brand = await _brandRepository.Get(id);
            if (brand == null)
            {
                return NotFound();
            }
            return Ok(brand);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Brand brand)
        {
            if (ModelState.IsValid)
            {
                var createdBrand = await _brandRepository.Post(brand);
                return CreatedAtAction(nameof(GetById), new { id = ((Brand)createdBrand).BrandId }, createdBrand);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Brand brand)
        {

            var data = await _brandRepository.Put(id, brand);
            return Ok(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var brand = await _brandRepository.Delete(id);
            if (brand != null)
            {
                return Ok(brand);
            }
            return NotFound();
        }
    }
}
