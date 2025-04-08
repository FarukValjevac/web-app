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
    [Route("api/person")]
    public class PersonController : ControllerBase
    {
        // In-memory list to store persons (for simplicity)
        private static List<Person> people = new();

        // Add _context for the DB
        private readonly AppDbContext _context;

        public static void PrintPeopleList(List<Person> people)
        {
            // Output the list of people to the console (just for debugging purposes)
            Console.WriteLine("\nCurrent People List:");
            Console.WriteLine("---------------------");
            Console.WriteLine(string.Join("\n", people.Select((p, i) => $"{i + 1}. Name: {p.Name}, Surname: {p.Surname}, Age: {p.Age}, Gender: {p.Gender}")));
        }

        public PersonController(AppDbContext context)
        {
            _context = context;

            // Load once at startup if list is empty
            if (!people.Any())
            {
                people = _context.People.ToList(); // Loads from DB if people is empty
            }
        }

        [HttpPost]
        public IActionResult AddPerson([FromBody] Person person)
        {
            // Add the person to the in-memory list (this is optional, depending on your logic)
            people.Add(person);
            
            // Add the person to the database
            _context.People.Add(person);
            _context.SaveChanges();  // This saves the changes to the DB

            // Output the list of people to the console (just for debugging purposes)
            PrintPeopleList(people);
            
            return Ok(person);
        }

        [HttpGet]
        public IActionResult GetPeople()
        {
            return Ok(people);
        }

        [HttpDelete("{name}")]
        public IActionResult DeletePerson(string name)
        {
            // Fetch the person from the database with case-insensitive comparison
            var personDb = _context.People
                .FirstOrDefault(p => p.Name.ToLower() == name.ToLower());

            var personList = people.FirstOrDefault(p => p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));


            if (personDb == null)
            {
                // Log that the person was not found
                Console.WriteLine($"Person with name '{name}' not found.");
                return NotFound();
            }

            if (personList == null) return NotFound();

            // remove person from the list
            people.Remove(personList);
            // Output the list of people to the console (just for debugging purposes)
            PrintPeopleList(people);
            // Log the person being deleted
            Console.WriteLine($"Deleting person: {personDb.Name}");

            // Remove the person from the database
            _context.People.Remove(personDb);
            
            // Commit the changes
            int affectedRows = _context.SaveChanges();
            
            if (affectedRows > 0)
            {
                // Log success
                Console.WriteLine($"Successfully deleted person: {personDb.Name}");
                return Ok(people);
            }
            else
            {
                // Log failure
                Console.WriteLine($"Failed to delete person: {personDb.Name}");
                return StatusCode(500, "Failed to delete person.");
            }
        }
    }
}
