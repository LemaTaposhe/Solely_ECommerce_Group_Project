using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using IsDB_R57_Solely.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;

namespace IsDB_R57_Solely.Entities.Orders
{
    public class DeliveryMethod
    {
        [Key]
        public int DeliveryMethodId { get; set; }
        public string? ShortName { get; set; }
        public string? Description { get; set; }
        public string? DeliveryTime { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Price { get; set; } = 0.00M;
        public bool? isActive { get; set; } = true;

    }


}