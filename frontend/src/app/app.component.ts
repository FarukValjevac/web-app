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
  people: Person[] = [];
  newPerson: Person = { name: '', surname: '', age: 0, gender: 'No Infos' };

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getPeople().subscribe({
      next: (data) => {
        this.people = data;
      },
      error: (err) => {
        console.error('Error loading people:', err);
        alert('Failed to load people. Check console for details.');
      },
    });
  }

  addPerson() {
    if (!this.newPerson.name.trim()) return;

    this.personService.addPerson(this.newPerson).subscribe({
      next: (person) => {
        this.people = [...this.people, person]; // Immutable update
        this.newPerson = { name: '', surname: '', age: 0, gender: 'No Infos' };
      },
      error: (err) => {
        console.error('Error adding person:', err);
        alert('Failed to add person. Check console for details.');
      },
    });
  }

  // Delete person from the list by name
  deletePerson(name: string) {
    this.personService.deletePerson(name).subscribe({
      next: (updatedPeople) => {
        // Directly update the people list with the updated list after deletion
        this.people = updatedPeople; // Update the people list from the backend
      },
      error: (err) => {
        console.error('Error deleting person:', err);
        alert('Failed to delete person. Check console for details.');
      },
    });
  }
}
