using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using IsDB_R57_Solely.Entities.Inventory;
using IsDB_R57_Solely.Entities.Users;

namespace IsDB_R57_Solely.Entities.Products
{
    public class Product
    {

        [Key]
        public int ProductId { get; set; }

        [StringLength(450)]
        public string? Name { get; set; }

        public string? Description { get; set; }

        [Column(TypeName ="decimal(18,4)")]
        public decimal Price { get; set; }

        [StringLength(450)]
        public string? NormalizedName { get; set; }

        public string? ThumbnailImage { get; set; }

        [NotMapped]
        public IFormFile? Image { get; set; }

        public int? CategoryId { get; set; }
        
        public Category? Category { get; set; }

        public int? TagId { get; set; }
        public Tag? Tag { get; set; }

        public int? BrandId { get; set; }
        public Brand? Brand { get; set; }

        public bool? isActive { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;

    }
}
