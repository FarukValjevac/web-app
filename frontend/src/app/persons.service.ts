import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  // Base URL of the backend API for person-related endpoints
  private apiUrl = 'http://localhost:3005/api/person';

  // Inject the Angular HttpClient to perform HTTP requests
  constructor(private http: HttpClient) {}

  // Fetches the list of people from the backend API
  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  // Sends a new person object to the backend to be added (POST request)
  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  // Sends a DELETE request to remove a person by name
  deletePerson(name: string): Observable<Person[]> {
    // encodeURIComponent handles special characters in the name
    return this.http.delete<Person[]>(
      `${this.apiUrl}/${encodeURIComponent(name)}`
    );
  }
}

// Interface representing the structure of a Person object
export interface Person {
  name: string;
  surname: string;
  age: number;
  gender: string;
}
