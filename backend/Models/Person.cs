namespace backend.Models
{
    // The Person class represents a data model for a person entity.
    // This model is used to map data between the application and the database.
    public class Person
    {
        // Primary key for the Person entity (auto-incremented by the database)
        public int Id { get; set; }

        // First name of the person
        public string Name { get; set; } = string.Empty;

        // Surname of the person
        public string Surname { get; set; } = string.Empty;

        // Age of the person
        public int Age { get; set; }

        // Gender of the person (e.g., Male, Female, Other)
        public string Gender { get; set; } = string.Empty;
    }
}
