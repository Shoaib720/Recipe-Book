import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auths/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shopping';

  constructor(private authService: AuthenticationService){}

  ngOnInit(){
    this.authService.autologin();
  }
}
