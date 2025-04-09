using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using backend.Data;

var builder = WebApplication.CreateBuilder(args);

// ================================
// Configure Services
// ================================

// Add controller services (API endpoints)
builder.Services.AddControllers();

// Register the AppDbContext with PostgreSQL connection string
// This sets up Entity Framework Core to use PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql("Host=localhost;Database=web-app-DB"));

// Configure CORS policy to allow requests from any origin, method, and header
// Useful during development or if you expect frontend/backend to run on different domains
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// ================================
// Configure HTTP Request Pipeline
// ================================

// Apply the CORS policy globally
app.UseCors("AllowAll");

// Map controller routes (e.g., /api/example)
app.MapControllers();

// Start the web application
app.Run();
