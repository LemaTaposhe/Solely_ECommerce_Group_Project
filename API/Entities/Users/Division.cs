namespace IsDB_R57_Solely.Entities.Users
{
    public class Division
    {
        public Division(string name) { Name = name; }
        public int DivisionId { get; set; }
        public string Name { get; set; }
        public bool? isActive { get; set; } = true;
        public virtual IList<District>? Districts { get; set; }
    }
}
