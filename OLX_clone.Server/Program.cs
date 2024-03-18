using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OLX_clone.Server.Data;
using OLX_clone.Server.Data.Contracts;
using OLX_clone.Server.Data.Repositories.CategoryRepository;
using OLX_clone.Server.Data.Repositories.GenericRepositor;
using OLX_clone.Server.Services.CategoryService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultDbConnection"));
});
builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
