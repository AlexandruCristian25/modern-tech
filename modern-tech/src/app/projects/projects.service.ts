import { Subject } from 'rxjs';
import { PeopleService } from './../people-list/people.service';
import { Person } from './../shared/person.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Project } from './project.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projectListChanged = new Subject<Project[]>();

  private projects: Project[] = [];
  // private projects: Project[] = [
  //   new Project(
  //     'Project One',
  //     'Project one description testing...',
  //     [
  //       new Person('Alexandru', 290, 'alexandru@companie.com'),
  //       new Person('Ioana', 471, 'ioana@companie.com'),
  //       new Person('Catalina', 100, 'catalina@companie.com')
  //     ]
  //     ),
  //   new Project(
  //     'Project Two',
  //     'Project two description testing...',
  //     [
  //       new Person('Mihai', 96, 'mihai@companie.com'),
  //       new Person('Andreea', 534, 'andreea@companie.com'),
  //       new Person('Bianca', 75, 'bianca@companie.com')
  //     ]
  //     ),


  selectedProject = new EventEmitter<Project>();

  constructor(private peopleSrv: PeopleService) { }

  getAllProjects() {
    return this.projects.map(p => p);
  }

  getProjectByIndex(index: number) {
    return this.projects[index];
  }

  addAllPeople(persons: Person[]) {
    this.peopleSrv.addGroupToList(persons);
  }

  updateProjectIndex(i: number, project: Project) {
    this.projects[i] = project;
    this.projectListChanged.next(this.projects.map(p => p));
  }

  addNewProject(project: Project) {
    this.projects.push(project);
    this.projectListChanged.next(this.projects.map(p => p));
  }

  deleteProject(i: number) {
    this.projects.splice(i, 1);
    this.projectListChanged.next(this.projects.map(p => p));
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
    this.projectListChanged.next(this.projects.map(p => p));
  }
}
