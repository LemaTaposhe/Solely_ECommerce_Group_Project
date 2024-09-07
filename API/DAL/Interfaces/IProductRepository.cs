using IsDB_R57_Solely.Entities.Products;

namespace IsDB_R57_Solely.DAL.Interfaces
{
    public interface IProductRepository:IRepository<Product>
    {
        //IEnumerable<Product> GetProductByCategory(int categoryId);
    }
}
