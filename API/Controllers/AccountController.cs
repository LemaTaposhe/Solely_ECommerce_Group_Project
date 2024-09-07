using IsDB_R57_Solely.DAL.DTOs;
using IsDB_R57_Solely.DAL.JWTService;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
[EnableCors("AllowOrigin")]
public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userMgr;
    private readonly SignInManager<User> _signinMgr;
    private readonly ITokenService _token;
    private readonly SolelyDbContext _context;

    public AccountController(UserManager<User> userMgr, SignInManager<User> signinMgr, ITokenService token, SolelyDbContext context)
    {
        this._userMgr = userMgr;
        this._signinMgr = signinMgr;
        this._token = token;
        this._context = context;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetCurrentUser()
    {
        var email = HttpContext.User?.Claims?.FirstOrDefault(a => a.Type == ClaimTypes.Email)?.Value;

        var user = await _userMgr.Users.SingleOrDefaultAsync(a => a.Email == email);

        return new UserDTO()
        {
            Email = user.Email,
            Token = _token.CreateToken(user),
            Fullname = user.FullName
        };
    }

    [HttpGet("emailexists")]
    public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
    {
        return await _userMgr.FindByEmailAsync(email) != null;
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<AddressDTO>> GetUserAddress()
    {
        var email = HttpContext.User?.Claims?.FirstOrDefault(a => a.Type == ClaimTypes.Email)?.Value;

        var user = await _userMgr.Users.Include(a => a.Address).SingleOrDefaultAsync(a => a.Email == email);


        if (user == null || user.Address == null)
        {
            return NotFound("User or user address not found.");
        }

        return new AddressDTO()
        {
            Phone = user.Address.Phone,
            AddressLine1 = user.Address.AddressLine1,
            AddressLine2 = user.Address.AddressLine2,
            City = user.Address.City,
            ZipCode = user.Address.ZipCode,
            DistrictId = user.Address.DistrictId
        };
    }

    [Authorize]
    [HttpPut("address")]
    public async Task<ActionResult<AddressDTO>> UpdateUserAddress(AddressDTO addressDTO)
    {
        var email = HttpContext.User?.Claims?.FirstOrDefault(a => a.Type == ClaimTypes.Email)?.Value;

        if (email == null)
        {
            return BadRequest("User email not found in claims.");
        }

        var user = await _userMgr.Users.Include(u=>u.Address).SingleOrDefaultAsync(a => a.Email == email);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        if (user.Address == null)
        {
            user.Address = Mapper.MapToAddress(addressDTO);
            user.Address.UserId = user.Id;

            // Add new address to the context
            await _context.AddAsync(user.Address); // Make sure _context is injected and used properly
        }
        else
        {
            // Update existing address
            user.Address.Phone = addressDTO.Phone;
            user.Address.AddressLine1 = addressDTO.AddressLine1;
            user.Address.AddressLine2 = addressDTO.AddressLine2;
            user.Address.City = addressDTO.City;
            user.Address.ZipCode = addressDTO.ZipCode;
            user.Address.DistrictId = addressDTO.DistrictId;

            // Mark address as modified
            _context.Entry(user.Address).State = EntityState.Modified;
        }

        // Save changes to both user and address
        var result = await _userMgr.UpdateAsync(user);

        if (result.Succeeded)
        {
            var updatedAddressDTO = Mapper.MapToAddressDTO(user.Address);
            return Ok(updatedAddressDTO);
        }

        return BadRequest("Update not done!");
    }



    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
    {
        var user = await _userMgr.FindByEmailAsync(loginDto.Email);

        if (user == null)
        {
            return Unauthorized("User Not Found");
        }

        var result = await _signinMgr.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded)
        {
            return Unauthorized("Wrong Password");
        }

        return new UserDTO()
        {
            Email = user.Email,
            Token = _token.CreateToken(user),
            Fullname = user.FullName
        };
    }

    [HttpPost("registerCustomer")]
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
    {
        var user = new User()
        {
            FirstName = registerDTO.FirstName,
            LastName = registerDTO.LastName,
            Email = registerDTO.Email,
            UserName = registerDTO.Email,
            CreatedOn = DateTime.UtcNow,
            isActive = true
        };

        var result = await _userMgr.CreateAsync(user, registerDTO.Password);

        if (!result.Succeeded)
        {
            return BadRequest();
        }

        return new UserDTO()
        {
            Fullname = user.FullName,
            Token = _token.CreateToken(user),
            Email = registerDTO.Email
        };
    }
    [HttpPost("registerAdmin")]
    public async Task<ActionResult<UserDTO>> RegisterAdmin(RegisterDTO registerDTO)
    {
        var user = new User()
        {
            FirstName = registerDTO.FirstName,
            LastName = registerDTO.LastName,
            Email = registerDTO.Email,
            UserName = registerDTO.Email,
            CreatedOn = DateTime.UtcNow
        };

        var result = await _userMgr.CreateAsync(user, registerDTO.Password);

        if (!result.Succeeded)
        {
            return BadRequest();
        }

        return new UserDTO()
        {
            Fullname = user.FullName,
            Token = _token.CreateToken(user),
            Email = registerDTO.Email
        };
    }
}
