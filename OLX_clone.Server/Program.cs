using System.Text;
using Azure.Storage.Blobs;
using Hangfire;
using Hangfire.Storage.SQLite;
using HangfireBasicAuthenticationFilter;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OLX_clone.Server.Data;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Data.Repositories;
using OLX_clone.Server.Models;
using OLX_clone.Server.Services;
using OLX_clone.Server.Services.AuthService;
using OLX_clone.Server.Services.BlobService;
using OLX_clone.Server.Services.BoostService;
using OLX_clone.Server.Services.CategoryService;
using OLX_clone.Server.Services.PaymentService;
using OLX_clone.Server.Services.PostService;
using OLX_clone.Server.Services.TransactionService;
using OLX_clone.Server.Services.UserService;
using OLX_clone.Server.Data.Configurations;
using OLX_clone.Server.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description =
            "JWT Authorization header using the Bearer scheme. \r\n\r\n " +
            "Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\n" +
            "Example: \"Bearer 12345abcdef\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Scheme = JwtBearerDefaults.AuthenticationScheme
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultDbConnection"));
});
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
}).AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddSingleton(u => new BlobServiceClient(
    builder.Configuration.GetConnectionString("StorageAccount")));
builder.Services.AddSingleton<IBlobService, BlobService>();

builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IChatService, ChatService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IBoostPackageService, BoostPackageService>();
builder.Services.AddScoped<IBoostService, BoostService>();
builder.Services.AddScoped<IBoostExpirationService, BoostExpirationService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddSignalR();

builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSQLiteStorage(builder.Configuration.GetConnectionString("HangfireConnection")));

builder.Services.AddHangfireServer();

builder.Services.AddAuthentication(u =>
{
    u.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    u.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(u =>
{
    u.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"]))
    };
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (builder.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        await UserSeeder.Initialize(services, userManager, roleManager);
    }
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<GlobalExceptionHandlingMiddleware>();
app.UseHangfireDashboard();
app.MapHangfireDashboard("/hangfiredashboard", new DashboardOptions()
{
    DashboardTitle = "eVSE Dashboard",
    Authorization = new []
    {
        new HangfireCustomBasicAuthenticationFilter()
        {
            Pass = "evseadmin",
            User = "eVSEAdmin"
        }
    }
});

RecurringJob.AddOrUpdate<IBoostExpirationService>(x => x.CheckBoostExpiration(), Cron.Minutely);   

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
