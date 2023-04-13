import { ProjectsService } from './../projects.service';
import { Component, OnInit } from '@angular/core';

import { Project } from '../project.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[];

  constructor(
    private projectSrv: ProjectsService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit():void {
    this.projectSrv.projectListChanged.subscribe((projects: Project[]) => {
      this.projects = projects;
    });
    this.projects = this.projectSrv.getAllProjects();
  }

  newProject() {
    // this.router.navigate(['/projects/new']);
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
