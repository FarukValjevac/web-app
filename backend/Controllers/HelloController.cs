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
            return Ok(person);
        }

        [HttpGet]
        public IActionResult GetPeople()
        {
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
