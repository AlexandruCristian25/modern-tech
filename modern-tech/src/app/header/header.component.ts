import { DataService } from './../shared/data.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{

  isAuthenticated = false;

  constructor(private authService: AuthService, private dataService: DataService) {}

  ngOnInit(): void {
    this.authService.token.subscribe(res => {
      if(res) {
        this.getData();
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    })


  }

  doLogin() {
    this.authService.logIn();
  }

  saveData() {
    this.dataService.saveProjectsToDb();
  }

  getData() {
    this.dataService.getProjectsFromDb();
  }

  doLogout() {
    this.authService.logOut();
  }
}
