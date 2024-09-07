using IsDB_R57_Solely.Entities.Users;

namespace IsDB_R57_Solely.DAL.Interfaces
{
    public interface IDistrictRepository:IRepository<District>
    {
        Task<bool> CheckDuplicate(string name, int divisionId); // Add this method
    }
}
