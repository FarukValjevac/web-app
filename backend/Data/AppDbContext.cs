using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    // AppDbContext represents the Entity Framework Core database context.
    // It acts as a bridge between your application and the database.
    public class AppDbContext : DbContext
    {
        // Constructor that accepts configuration options for the DbContext.
        // These options are typically passed in via dependency injection in Program.cs.
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Represents the "People" table in the database.
        // Entity Framework uses this DbSet to perform queries and updates on the Person entity.
        public DbSet<Person> People { get; set; }
    }
}
