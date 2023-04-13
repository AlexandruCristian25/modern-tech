import { Injectable, EventEmitter } from '@angular/core';
import { Person } from '../shared/person.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private people: Person[] = [
    new Person('Ionescu', 967, 'ionescu@companie.com'),
    new Person('Alexandra', 140, 'alexandra@companie.com'),
    new Person('Stefania', 650, 'stefania@companie.com')
  ];
  peopleListChanged = new EventEmitter<Person[]>();

  personEdit = new Subject<number>();

  constructor() { }

  getAllPersons() {
    return this.people.map(p => p);
  }

  getPersonFromIndex(i: number) {
    return this.people[i];
  }

  addPerson(person: Person) {
    this.people.push(person);
    this.peopleListChanged.emit(this.people.map(p => p));
  }

  addGroupToList(persons: Person[]) {
    this.people.push(...persons);
    this.peopleListChanged.emit(this.people.map(p => p));
  }

  editPersonAtIndex(i: number, person: Person) {
    this.people[i] = person;
    this.peopleListChanged.emit(this.people.map(p => p));
  }

  deletePerson(i: number) {
    this.people.splice(i, 1);
    this.peopleListChanged.emit(this.people.map(p => p));
  }

}
