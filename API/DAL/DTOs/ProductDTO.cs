using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using IsDB_R57_Solely.Entities.Products;

namespace IsDB_R57_Solely.DAL.DTOs
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string NormalizedName { get; set; }
        public string ThumbnailImage { get; set; }
        public bool IsPublished { get; set; }
        public DateTime? PublishedOn { get; set; }

        public Category Category { get; set; }
        public Tag Tag { get; set; }
        public Brand Brand { get; set; }
        public int? Quantity { get; set; }
        public bool isActive { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
