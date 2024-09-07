using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IsDB_R57_Solely.Entities.Users
{
    public class User : IdentityUser<int>
    {
        [MaxLength(100)]
        public string? FirstName { get; set; }
        [MaxLength(100)]
        public string? LastName { get; set; }
        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";
        public Address? Address { get; set; }
        public bool? isActive { get; set; }
        public DateTime CreatedOn { get; set; } 
    }
}
