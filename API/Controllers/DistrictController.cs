using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Entities.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using IsDB_R57_Solely.Entities.Users;
using Microsoft.EntityFrameworkCore;

//namespace IsDB_R57_Solely.Controllers
//{
//    [Route("api/District")]
//    [ApiController]
//    //[AllowAnonymous]
//    //[Authorize]
//    [EnableCors("AllowOrigin")]
//    public class DistrictController : ControllerBase
//    {
//        public IDistrictRepository _irepo;
//        public DistrictController(IDistrictRepository repository)
//        {
//            _irepo = repository;
//        }

//        [HttpGet]
//        [Route("GetAllDistricts")]
//        public async Task<IActionResult> Index()
//        {
//            var districts = await _irepo.Get();
//            return Ok(districts);
//        }

//        [HttpGet]
//        [Route("GetDistrict/{id}")]
//        public async Task<IActionResult> Get(int id)
//        {
//            var district = await _irepo.Get(id);
//            return Ok(district);
//        }

//        [AllowAnonymous]
//        [HttpDelete]
//        [Route("DeleteDistrict/{id}")]
//        public async Task<IActionResult> Delete(int id)
//        {
//            var data = await _irepo.Delete(id);
//            if (data != null)
//            {
//                return Ok();
//            }
//            return Content("District does not exists...");
//        }

//        [HttpPost]
//        [Route("SaveDistrict")]
//        public async Task<IActionResult> Post(District district)
//        {
//            await _irepo.Post(district);
//            return Ok(district);
//        }

//        [HttpPut]
//        [Route("UpdateDistrict/{id}")]
//        public async Task<IActionResult> Put(int id, District district)
//        {
//            await _irepo.Put(id, district);
//            return Ok(district);
//        }

//        [HttpGet("CheckDuplicate/{name}/{divisionId}")]
//        public async Task<ActionResult<bool>> CheckDuplicate(string name, int divisionId)
//        {
//            var exists = await _irepo.CheckDuplicate(name, divisionId);
//            return Ok(exists);
//        }

//    }

//}
