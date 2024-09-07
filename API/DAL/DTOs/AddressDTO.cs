namespace IsDB_R57_Solely.DAL.DTOs
{
    public class AddressDTO
    {
        public string? Phone { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? ZipCode { get; set; }
        public int? DistrictId { get; set; }
    }
}
