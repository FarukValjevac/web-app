import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrl = 'http://localhost:3005/api/person';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  deletePerson(name: string): Observable<Person[]> {
    return this.http.delete<Person[]>(
      `${this.apiUrl}/${encodeURIComponent(name)}`
    );
  }
}

export interface Person {
  name: string;
  surname: string;
  age: number;
  gender: string;
}
