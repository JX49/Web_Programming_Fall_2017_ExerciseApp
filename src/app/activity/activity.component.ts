import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from "@angular/http";
import {Room, User, Activity} from "../models/activity"
import { ActivityService } from "../models/activity.service";
import { Router } from '@angular/router';

//Final
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

const exercises = ['weight lifting', 'surfing', 'boxing',
'parkour', 'diving', 'yoga' ];


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
    console.log(data);
    
    this.http.post(this.activity.apiRoot + "/activity/room/activities", data).subscribe(res=>{
    console.log("posted");
      this.me.completed.push(activity);
    })
    
  }
  
  submitActivityNew(e: MouseEvent, activity: string,calories?: number){
    e.preventDefault();
  console.log(calories);
  
let newActivity = new Activity;
newActivity.text = activity;
  newActivity.calories = calories;
  newActivity.user = this.me.name;

    const data = { text: activity, user: this.me.name, cals: calories };
    console.log("test below");
    console.log(data);
    
    this.http.post(this.activity.apiRoot + "/activity/room/activities", data).subscribe(res=>{
    console.log("posted");
      this.me.completed.push(newActivity);
    })
    
  }


}




export class NgbdTypeaheadBasic {
  public autoBox: any;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : exercises.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

}
