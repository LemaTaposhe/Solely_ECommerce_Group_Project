using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Metrics;

namespace IsDB_R57_Solely.Entities.Users
{
    public class Address 
    {
        public int AddressId { get; set; }
        public string? Phone { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? ZipCode { get; set; }

        public int? DistrictId { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }

        public District? District { get; set; }
    }
}
