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
using OLX_clone.BusinessLogicLayer.Middleware;
using OLX_clone.DataAccessLayer;
using OLX_clone.DataAccessLayer.Configurations;
using OLX_clone.DataAccessLayer.Models;
using OLX_clone.DataAccessLayer.Repositories;
using OLX_clone.BusinessLogicLayer.Services;
using OLX_clone.BusinessLogicLayer.Services.Contracts;
using OLX_clone.DataAccessLayer.Repositories.Contracts;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add Serilog configuration
Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();
builder.Host.UseSerilog();

// Add services to the container.
builder.Services.AddControllers();

// Swagger/OpenAPI configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = JwtBearerDefaults.AuthenticationScheme
                },
                Scheme = "oauth2",
                Name = JwtBearerDefaults.AuthenticationScheme,
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

// Database and Identity configuration
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultDbConnection")));
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
}).AddEntityFrameworkStores<ApplicationDbContext>();

// Service registration
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
builder.Services.AddScoped<IFavoriteService, FavoriteService>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Real-time and background services
builder.Services.AddSignalR();
builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSQLiteStorage(builder.Configuration.GetConnectionString("HangfireConnection")));
builder.Services.AddHangfireServer();

// Authentication and authorization
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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Static files
app.UseDefaultFiles();
app.UseStaticFiles();

// Routing
app.UseRouting();  // This must come before UseAuthentication, UseAuthorization, and UseEndpoints

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// Middleware
app.UseMiddleware<GlobalExceptionHandlingMiddleware>();
//app.UseRequestLogging();
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

// Endpoints
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/chathub");
    endpoints.MapControllers();
});

// Fallback
app.MapFallbackToFile("/index.html");

// Seed data
if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        await UserSeeder.Initialize(services, userManager, roleManager);
    }
}

RecurringJob.AddOrUpdate<IBoostExpirationService>(x => x.CheckBoostExpiration(), Cron.Hourly); 

app.Run();