import { Project } from './../project.model';
import { ProjectsService } from './../projects.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  id: number;
  editMode = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private prjService: ProjectsService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] !== undefined;
      this.initForm();
    });
  }

  initForm() {
    let prjName = '';
    let prjDescription = '';
    let prjPersons = new FormArray([]);

    if (this.editMode) {
      let prj = this.prjService.getProjectByIndex(this.id);
      prjName = prj.name;
      prjDescription = prjDescription;
      if (prj['persons']) {
        for (let person of prj.persons) {
          prjPersons.push(
            new FormGroup({
              'name': new FormControl(person.name, Validators.required),
              'email': new FormControl(person.email, [Validators.required, Validators.email]),
            })
          );
        }
      }
    }

    this.form = new FormGroup({
      'name': new FormControl(prjName, Validators.required),
      'description': new FormControl(prjDescription, Validators.required),
      'persons': prjPersons,
    });
  }

  onSubmit() {
    // const newPrj: Project = {
    //   name: this.form.value['name'],
    //   description: this.form.value['description'],
    //   persons: this.form.value['persons'],
    // };

    if (this.editMode) {
      this.prjService.updateProjectIndex(this.id, this.form.value);
    } else {
      this.prjService.addNewProject(this.form.value);
    }

    this.onCancel();

  }

  getPersonControls() {
    return (this.form.get('persons') as FormArray).controls;
  }

  onPersonAdd() {
    (this.form.get('persons') as FormArray).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
    }));
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onRemovePerson(i: number) {
    (this.form.get('persons') as FormArray).removeAt(i);
  }

}
