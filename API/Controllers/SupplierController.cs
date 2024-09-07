using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Entities.Inventory;
using IsDB_R57_Solely.Entities.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IsDB_R57_Solely.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class SupplierController : ControllerBase
    {
        public ISupplierRepository _irepo;
        public SupplierController(ISupplierRepository repository)
        {
            _irepo = repository;
        }

        [HttpGet, Route("GetSuppliers")]
        public async Task<IActionResult> Index()
        {
            var suppliers = await _irepo.Get();
            return Ok(suppliers);
        }

        [HttpGet]
        [Route("GetSupplier/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var suppliers = await _irepo.Get(id);
            return Ok(suppliers);
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("DeleteSupplier/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var data = await _irepo.Delete(id);
            if (data != null)
            {
                return Ok();
            }
            return Content("Supplier does not exists...");
        }

        [HttpPost]
        [Route("InsertSupplier")]
        public async Task<IActionResult> Post(Supplier supplier)
        {
            await _irepo.Post(supplier);
            return Ok(supplier);
        }


        [HttpPut, Route("UpdateSupplier/{id}")]
        public async Task<IActionResult> Put(int id, Supplier supplier)
        {
            await _irepo.Put(id, supplier);
            return Ok(supplier);
        }
    }
}
