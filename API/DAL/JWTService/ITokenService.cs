using IsDB_R57_Solely.Entities.Users;

namespace IsDB_R57_Solely.DAL.JWTService
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
