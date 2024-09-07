using IsDB_R57_Solely.Entities.Users;
using System.ComponentModel.DataAnnotations.Schema;

namespace IsDB_R57_Solely.Entities.Products
{
    public class ProductPriceHistory
    {
        public int ProductPriceHistoryId { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;

        [Column(TypeName = "decimal(18,4)")]
        public decimal? Price { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public decimal? OldPrice { get; set; }

        //[Column(TypeName = "decimal(18,4)")]
        //public decimal? SpecialPrice { get; set; }

        //public DateTimeOffset? SpecialPriceStart { get; set; }

        //public DateTimeOffset? SpecialPriceEnd { get; set; }

        [NotMapped]
        public bool IsPriceChange { get; set; }
    }
}
