import { LoginService } from './auth/login.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.loginService.checkUserLoginState();
  }
}
