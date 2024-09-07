using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Entities.Products;
using IsDB_R57_Solely.Entities.Users;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

//namespace IsDB_R57_Solely.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    [EnableCors("AllowOrigin")]
//    public class DivisionController : ControllerBase
//    {
//        public IDivisionRepository _irepo;
//        public DivisionController(IDivisionRepository repository)
//        {
//            _irepo = repository;
//        }

//        [HttpGet, Route("GetDivisions")]
//        public async Task<IActionResult> Index()
//        {
//            var divisions = await _irepo.Get();
//            return Ok(divisions);
//        }

//        [HttpGet]
//        [Route("GetDivisions/{id}")]
//        public async Task<IActionResult> Get(int id)
//        {
//            var division = await _irepo.Get(id);
//            return Ok(division);
//        }


//        [HttpDelete, Route("DeleteDivision/{id}")]
//        public async Task<IActionResult> Delete(int id)
//        {
//            var data = await _irepo.Delete(id);
//            if (data != null)
//            {
//                return RedirectToRoute("Index");
//            }
//            return Content("Division does not exists...");
//        }

//        [HttpPost, Route("InsertDivision")]
//        public async Task<IActionResult> Post(Division division)
//        {
//            await _irepo.Post(division);
//            return Ok(division);
//        }


//        [HttpPut, Route("UpdateDivision/{id}")]
//        public async Task<IActionResult> Put(int id, Division division)
//        {
//            await _irepo.Put(id, division);
//            return Ok(division);
//        }
//    }
//}
