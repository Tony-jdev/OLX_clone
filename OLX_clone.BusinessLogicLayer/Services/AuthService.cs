using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OLX_clone.BusinessLogicLayer.Middleware.Exceptions;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer;
using OLX_clone.DataAccessLayer.Helpers;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Models.Dtos.Auth;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace OLX_clone.BusinessLogicLayer.Services;

public class AuthService: IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;
    
    public AuthService(ApplicationDbContext context, IConfiguration configuration,
        UserManager<ApplicationUser> userManager, IMapper mapper)
    {
        _context = context;
        _configuration = configuration;
        _userManager = userManager;
        _mapper = mapper;
    }
    
    public async Task<ApiResponse<IEnumerable<IdentityError>>> Register(RegisterRequestDto registerRequestDto)
    {
        var userFromDb = await _userManager.FindByEmailAsync(registerRequestDto.Email);    

        if (userFromDb != null)
        {
            throw new BadRequestException("User with this email already exists.");
        }

        var user = _mapper.Map<ApplicationUser>(registerRequestDto);
        
        var result = await _userManager.CreateAsync(user, registerRequestDto.Password);
        if (result.Succeeded)   
        {
            await _userManager.AddToRoleAsync(user, SD.Role_User);
            
            return new ApiResponse<IEnumerable<IdentityError>> { Success = true, Message = "User registered successfully" };
        }

        throw new InternalServerErrorException("Error occurred while registering.");
    }
    
    public async Task<ApiResponse<LoginResponseDto>> Login(LoginRequestDto loginRequestDto)
    {
        var apiResponse = new ApiResponse<LoginResponseDto>();

        var userFromDb = await _userManager.FindByEmailAsync(loginRequestDto.Email);    
        if (!await _userManager.CheckPasswordAsync(userFromDb, loginRequestDto.Password))
        {
            throw new BadRequestException("Incorrect password.");
        }

        var token = await GenerateToken(userFromDb);
        
        LoginResponseDto loginResponse = new()
        {
            Token = token
        };

        apiResponse.Data = loginResponse;
        apiResponse.Message = "User logged in successfully";

        return apiResponse;
    }

    private async Task<string> GenerateToken(ApplicationUser user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
        
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        
        var roles = await _userManager.GetRolesAsync(user);
        var roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x)).ToList();
        var userClaims = await _userManager.GetClaimsAsync(user);
        
        var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Email),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Email, user.Email),
                new("uid", user.Id),
            }
            .Union(userClaims).Union(roleClaims);
        
        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToInt32(_configuration["JwtSettings:DurationInMinutes"])),
            signingCredentials: credentials
        );
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}