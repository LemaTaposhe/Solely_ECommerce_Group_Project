namespace IsDB_R57_Solely.Entities.Users
{
    public class District
    {
        public int DistrictId { get; set; }
        public int DivisionId { get; set; }
        public virtual Division? Division { get; set; }
        public string Name { get; set; }
        public string? Type { get; set; }
        public string? Location { get; set; }
        public bool? isActive { get; set; } = true;
    }
}
