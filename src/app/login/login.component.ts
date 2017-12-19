import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../models/activity.service';
import { User } from '../models/activity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  name: string;
  password: string;
  
  
    constructor(private activity: ActivityService, private router: Router) { }
  
      ngOnInit() {
      }
  
  
  
    login(){
      this.activity.login(this.name, this.password);
      
    }
  
    loginFB(){
      this.activity.loginFB();
    }
}
