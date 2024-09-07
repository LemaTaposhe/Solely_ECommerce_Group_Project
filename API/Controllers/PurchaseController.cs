using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Entities.Inventory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IsDB_R57_Solely.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private readonly IPurchaseRepository _repo;

        public PurchaseController(IPurchaseRepository repo)
        {
            _repo = repo;
        }

        [HttpGet, Route("Get")]
        public async Task<ActionResult> Get()
        {
            var entities = await _repo.Get();
            return Ok(entities);
        }

        [HttpGet, Route("Get/{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var entity = await _repo.Get(id);
            if (entity == null)
            {
                return NotFound();
            }
            return Ok(entity);
        }

        [HttpPost]
        public async Task<ActionResult> Post(Purchase entity)
        {
            if (ModelState.IsValid)
            {
                var createdEntity = await _repo.Post(entity);
                return Ok(createdEntity);
            }
            return BadRequest();
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Put(int id, Purchase entity)
        {
            var updatedEntity = await _repo.Put(id, entity);
            return Ok(updatedEntity);
        }

        [HttpPut]
        [Route("PutQuantity/{id}")]
        public async Task<ActionResult> PutQuantity(int id, int quantity)
        {
            var updatedQuantity = await _repo.UpdateStockQuantity(id, quantity);
            return Ok(updatedQuantity);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var entity = await _repo.Delete(id);
            if ((bool)entity)
            {
                return Ok();
            }
            return NotFound();
        }

    }
}
