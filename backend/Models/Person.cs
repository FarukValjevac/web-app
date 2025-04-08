namespace backend.Models
{
    public class Person
    {
        public int Id { get; set; } // ← Add this for EF as primary key
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Gender { get; set; } = string.Empty;
    }
}