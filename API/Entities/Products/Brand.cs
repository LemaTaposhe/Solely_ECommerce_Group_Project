using System.ComponentModel.DataAnnotations;

namespace IsDB_R57_Solely.Entities.Products
{
    public class Brand
    {
        [Key]
        public int BrandId { get; set; }

        [StringLength(450)]
        public string? Name { get; set; }

        public string? Description { get; set; }

        public bool? isActive { get; set; }

    }
}
