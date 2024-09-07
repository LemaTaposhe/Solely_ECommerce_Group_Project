using IsDB_R57_Solely.Entities.Users;

namespace IsDB_R57_Solely.DAL.ViewModel
{
    public class OrderAddress
    {
        public OrderAddress() { }

        public OrderAddress(string phone,string addressLine1,string addressLine2,string city, string zipCode,int districtId)
        {
            Phone = phone;
            AddressLine1 = addressLine1;
            AddressLine2 = addressLine2;
            City = city;
            ZipCode = zipCode;
            DistrictId = districtId;
        }
        public string? Phone { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? ZipCode { get; set; }
        public int? DistrictId { get; set; }
    }
}