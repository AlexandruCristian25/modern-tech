import { AuthRes, LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginAuthMode = true;
  loading = false;
  error: string = null;
  constructor (private loginService: LoginService) {}

  ngOnInit(): void {
  }

  changeAuthMode() {
    this.loginAuthMode = !this.loginAuthMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const email =form.value.email;
    const password = form.value.password;

    let authMethod: Observable<AuthRes>;

    this.loading = true;

    if (this.loginAuthMode) {
      authMethod = this.loginService.login(email, password);
    } else {
      authMethod = this.loginService.signUp(email, password);
  }

  authMethod.subscribe({
    next: res => {
    console.log('Result: ', res);
    this.loading = false;
    this.error = null;
    this.loginService.saveLoginData(res);
  },
  error: err => {
      console.log('Error: ', err);
      this.error = err;
      this.loading = false;
  }
})

    form.reset();
  }

  handleError() {
    this.error = null;
  }

}


