import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from "@angular/http";
import {Room, User, Activity} from "../models/activity"
import { ActivityService } from "../models/activity.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  
})
export class ActivityComponent implements OnInit {

  room = new Room();
  me: User;



  constructor(private http: Http, public activity: ActivityService, private router: Router) { }

  ngOnInit() {

    if(this.activity.me == null){
      
      this.router.navigate(['/login']);
    }
    this.me = this.activity.me;
    setInterval(()=> this.update(), 1000)
  }

  update(){
    this.http.get(this.activity.apiRoot + "/activity/room").subscribe( data => {
        this.room = data.json();
   
    });

  }

  submitActivity(e: MouseEvent, activity: Activity, i: number,calories?: number){
    e.preventDefault();
  console.log(calories);
  activity.calories = calories;
    const data = { text: activity.text, user: this.me.name, cals: calories };
    console.log("test below");
    console.log(this.me.name);
    
    this.http.post(this.activity.apiRoot + "/activity/room/activities", data).subscribe(res=>{
    console.log("posted");
      this.me.completed.push(activity);
    })
    
  }


}
