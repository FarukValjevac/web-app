using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/person")]
    public class PersonController : ControllerBase
    {
        // In-memory list to store persons (for simplicity)
        private static List<Person> people = new();

        [HttpPost]
        public IActionResult AddPerson([FromBody] Person person)
        {
            people.Add(person);
            Console.WriteLine("\nCurrent People List:");
            Console.WriteLine("---------------------");
            Console.WriteLine(string.Join("\n", people.Select((p, i) => $"{i+1}. Name: {p.Name}, Age: {p.Age}")));
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
            var person = people.FirstOrDefault(p => p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
            if (person == null) return NotFound();
            people.Remove(person);
            Console.WriteLine("\nCurrent People List:");
            Console.WriteLine("---------------------");
            Console.WriteLine(string.Join("\n", people.Select((p, i) => $"{i+1}. Name: {p.Name}, Age: {p.Age}")));
            return Ok(people);
        }

    }

    // Model for Person
    public class Person
    {
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
    }
}
