using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/person")] // Route prefix for all endpoints in this controller
    public class PersonController : ControllerBase
    {
        // In-memory list used to store people 
        private static List<Person> people = new();

        // Reference to the EF Core database context
        private readonly AppDbContext _context;

        // Utility method to print the current people list to the console for debugging
        public static void PrintPeopleList(List<Person> people)
        {
            Console.WriteLine("\nCurrent People List:");
            Console.WriteLine("---------------------");
            Console.WriteLine(string.Join("\n", people.Select((p, i) =>
                $"{i + 1}. Name: {p.Name}, Surname: {p.Surname}, Age: {p.Age}, Gender: {p.Gender}")));
        }

        // Constructor receives the database context through dependency injection
        public PersonController(AppDbContext context)
        {
            _context = context;

            // Load initial people from the database if the list is currently empty
            if (!people.Any())
            {
                people = _context.People.ToList();
            }
        }

        // POST: api/person
        // Adds a new person to both the in-memory list and the database
        [HttpPost]
        public IActionResult AddPerson([FromBody] Person person)
        {
            // Add to in-memory list 
            people.Add(person);

            // Add to the EF Core DbSet and save to the actual database
            _context.People.Add(person);
            _context.SaveChanges();

            // Log the updated list for debugging
            PrintPeopleList(people);

            return Ok(person); // Return the added person as confirmation
        }

        // GET: api/person
        // Retrieves the current list of people 
        [HttpGet]
        public IActionResult GetPeople()
        {
            return Ok(people);
        }

        // DELETE: api/person/{name}
        // Deletes a person by their name from both DB and in-memory list
        [HttpDelete("{name}")]
        public IActionResult DeletePerson(string name)
        {
            // Find the person in the database 
            var personDb = _context.People
                .FirstOrDefault(p => p.Name.ToLower() == name.ToLower());

            // Also find the person in the in-memory list
            var personList = people
                .FirstOrDefault(p => p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));

            // If person is not found in the database or the list, return 404
            if (personDb == null)
            {
                Console.WriteLine($"Person with name '{name}' not found.");
                return NotFound();
            }

            if (personList == null) return NotFound();

            // Remove from the in-memory list
            people.Remove(personList);
            PrintPeopleList(people); // Log the updated list

            Console.WriteLine($"Deleting person: {personDb.Name}");

            // Remove from the database context
            _context.People.Remove(personDb);

            // Save the changes to the database
            int affectedRows = _context.SaveChanges();

            if (affectedRows > 0)
            {
                // Deletion successful
                Console.WriteLine($"Successfully deleted person: {personDb.Name} {personDb.Surname}");
                return Ok(people); // Return updated list
            }
            else
            {
                // Deletion failed
                Console.WriteLine($"Failed to delete person: {personDb.Name}");
                return StatusCode(500, "Failed to delete person.");
            }
        }
    }
}
