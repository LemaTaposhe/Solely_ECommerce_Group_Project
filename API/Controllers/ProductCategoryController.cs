using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Entities.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IsDB_R57_Solely.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    //public class ProductCategoryController : ControllerBase
    //{
    //    public IProductCategoryRepository _irepo;
    //    public ProductCategoryController(IProductCategoryRepository repository)
    //    {
    //        _irepo = repository;
    //    }

    //    [HttpGet]
    //    public async Task<IActionResult> Index()
    //    {
    //        var pc = await _irepo.Get();
    //        return Ok(pc);
    //    }

    //    [HttpDelete]
    //    public async Task<IActionResult> Delete(int id)
    //    {
    //        var data = await _irepo.Delete(id);
    //        if (data != null)
    //        {
    //            return RedirectToRoute("Index");
    //        }
    //        return Content("Product Category does not exists...");
    //    }

    //    [HttpPost]
    //    public async Task<IActionResult> Post(ProductCategory pc)
    //    {
    //        await _irepo.Post(pc);
    //        return Ok(pc);
    //    }

    //    [HttpPut]
    //    public async Task<IActionResult> Put(int id, ProductCategory pc)
    //    {
    //        await _irepo.Put(id, pc);
    //        return Ok(pc);
    //    }
    //}
}
