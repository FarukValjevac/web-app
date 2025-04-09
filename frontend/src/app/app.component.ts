import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonService } from './persons.service';
import { Person } from './persons.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // Array to store the list of people retrieved from the backend
  people: Person[] = [];

  // Object to hold form input for creating a new person
  newPerson: Person = { name: '', surname: '', age: 0, gender: 'No Infos' };

  // Inject the PersonService to interact with the backend API
  constructor(private personService: PersonService) {}

  // Angular lifecycle hook that runs after component is initialized
  ngOnInit() {
    this.loadPeople(); // Fetch people list from the server when the app loads
  }

  // Loads the current list of people from the backend using the service
  loadPeople() {
    this.personService.getPeople().subscribe({
      next: (data) => {
        this.people = data; // Assign the retrieved data to the people array
      },
      error: (err) => {
        console.error('Error loading people:', err);
        alert('Failed to load people. Check console for details.');
      },
    });
  }

  // Adds a new person to the backend and updates the local list
  addPerson() {
    // Avoid adding a person with an empty name
    if (!this.newPerson.name.trim()) return;

    this.personService.addPerson(this.newPerson).subscribe({
      next: (person) => {
        // Append the new person to the local list (immutably)
        this.people = [...this.people, person];

        // Reset the form fields after successful addition
        this.newPerson = { name: '', surname: '', age: 0, gender: 'No Infos' };
      },
      error: (err) => {
        console.error('Error adding person:', err);
        alert('Failed to add person. Check console for details.');
      },
    });
  }

  // Deletes a person by name from both the backend and local list
  deletePerson(name: string) {
    this.personService.deletePerson(name).subscribe({
      next: (updatedPeople) => {
        // Update the local list after deletion based on the backend response
        this.people = updatedPeople;
      },
      error: (err) => {
        console.error('Error deleting person:', err);
        alert('Failed to delete person. Check console for details.');
      },
    });
  }
}
