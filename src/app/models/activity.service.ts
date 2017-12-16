import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "./activity";
import { Http } from "@angular/http";


declare var window: any;
declare var FB: any;


@Injectable()
export class ActivityService {


  apiRoot = '//localhost:3000' 
  me: User;

  ngOnInit(){}

  constructor(private http: Http, private router: Router) {
   
    console.log("Ok well it tried");
    window.fbAsyncInit = function() {
      console.log("initializing");
      FB.init({
        appId      : '161753371106684',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.11'
      });
        
      FB.AppEvents.logPageView();   
        
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = <HTMLScriptElement>d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  loginFB() {
    FB.login((response: any) => {
        if (response.authResponse) {
         console.log(response);

         FB.api('/me?fields=name,email,picture', (response: any) => {
           console.log(response);
           this.login(response.name, 'password', response.id, response.picture.data.url);
         });

        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    }, { scopes: 'email,user_photos,user_posts'});
}

login(name: string, password: string, fbid?: string, picture?: string){
    console.log(name + " " + password + " " + fbid + " " + picture)
    this.http.post(this.apiRoot + "/activity/room/players", { name, password, fbid, picture }).subscribe(
        data => {
            this.me = data.json();
            this.http.get(this.apiRoot + "/activity/activites").subscribe( data =>{
                this.me.quotes = data.json();
            });
            this.router.navigate(['/activity-tracker']);
        },
        err => {
            console.log(err);
        },
        () => {}
    )
    
}

}
  


