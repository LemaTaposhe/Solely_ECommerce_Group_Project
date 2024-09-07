using IsDB_R57_Solely.DAL.Interfaces;
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
    [AllowAnonymous]
    public class TagController : ControllerBase
    {
        private ITagRepository _repo;

        public TagController(ITagRepository repository)
        {
            _repo = repository;
        }

        [HttpGet, Route("Get")]
        public async Task<IActionResult> Get()
        {
            var tag = await _repo.Get();
            return Ok(tag);
        }

        [HttpGet, Route("Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var tag = await _repo.Get(id);
            return Ok(tag);
        }

        [HttpPost, Route("Post")]
        public async Task<IActionResult> Post(Tag tag)
        {
            var data = await _repo.Post(tag);
            if (data != null)
            {
                return Ok(tag);
            }
            return BadRequest();
        }

        [HttpDelete, Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var data = await _repo.Delete(id);
            return Ok(data);
        }

        [HttpPut, Route("Put/{id}")]
        public async Task<IActionResult> Put(Tag tag, int id)
        {
            var data = await _repo.Put(id, tag);
            return Ok(data);
        }
    }
}
