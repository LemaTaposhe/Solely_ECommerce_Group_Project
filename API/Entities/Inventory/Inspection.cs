using IsDB_R57_Solely.Enums;
using System.ComponentModel.DataAnnotations;

namespace IsDB_R57_Solely.Entities.Inventory
{
    public class Inspection
    {
        [Key]
        public int InspectionId { get; set; }

        public int RequistionId { get; set; }
        public Requisition? Requisition { get; set; }

        public DateTime InspectionDate { get; set; }

        public string? InspectionNote { get; set; }

        public InsepectionStatus? InsepectionStatus { get; set; }
    }
}
