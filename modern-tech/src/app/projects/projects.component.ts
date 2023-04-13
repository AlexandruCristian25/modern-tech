import { Project } from './project.model';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectSelected: Project | undefined;

  constructor(private projectsSrv: ProjectsService) {}

  ngOnInit(): void {
    // this.projectsSrv.selectedProject.subscribe((project: Project) => {
    //   this.projectSelected = project;
    // });
  }

}
