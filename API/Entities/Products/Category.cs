using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IsDB_R57_Solely.Entities.Products
{
    public class Category
    {
        public int CategoryId { get; set; }

        [StringLength(450)]
        public string? Name { get; set; }

        public string? Description { get; set; }

        public bool? isActive { get; set; }
    }
}
