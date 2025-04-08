import { Component, OnInit } from '@angular/core';
import { PersonService, Person } from './persons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = '';
  age: number | null = null;
  people: Person[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getPeople().subscribe((res) => {
      this.people = res;
    });
  }

  addPerson() {
    if (!this.name || this.age === null) return;

    const newPerson: Person = { name: this.name, age: this.age };
    this.personService.addPerson(newPerson).subscribe(() => {
      this.loadPeople(); // Refresh list
      this.name = '';
      this.age = null;
    });
  }
}
