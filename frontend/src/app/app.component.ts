import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonService } from './persons.service';
import { Person } from './persons.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>People Manager</h1>
      </header>

      <main class="app-main">
        <div class="form-container">
          <h2>Add New Person</h2>
          <form (ngSubmit)="addPerson()">
            <div class="form-group">
              <label for="name">Name:</label>
              <input
                type="text"
                id="name"
                [(ngModel)]="newPerson.name"
                name="name"
                required
              />
            </div>

            <div class="form-group">
              <label for="age">Age:</label>
              <input
                type="number"
                id="age"
                [(ngModel)]="newPerson.age"
                name="age"
                required
              />
            </div>

            <button type="submit">Add Person</button>
          </form>
        </div>

        <div class="people-list">
          <h2>People List</h2>
          @if (people.length > 0) {
          <ul>
            @for (person of people; track person.name) {
            <li>{{ person.name }}, {{ person.age }} years old</li>
            }
          </ul>
          } @else {
          <p>No people added yet.</p>
          }
        </div>
      </main>

      <footer class="app-footer">
        <p>&copy; FarukValjevac</p>
      </footer>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  people: Person[] = [];
  newPerson: Person = { name: '', age: 0 };

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
        this.newPerson = { name: '', age: 0 };
      },
      error: (err) => {
        console.error('Error adding person:', err);
        alert('Failed to add person. Check console for details.');
      },
    });
  }
}
