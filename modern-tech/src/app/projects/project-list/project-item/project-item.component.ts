import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../project.model';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent {

  @Input() project: Project;
  @Input() index: number;

  constructor(private projectSrv: ProjectsService) {}

  ngOnInit(): void {

  }

  onProjectClicked() {
    this.projectSrv.selectedProject.emit(this.project);
  }

}
