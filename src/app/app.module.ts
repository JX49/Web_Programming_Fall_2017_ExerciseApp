import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ActivityService } from './models/activity.service';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { ActivityComponent } from './activity/activity.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    ActivityComponent,
    IndexComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {path: "activity", component: ActivityComponent},
      {path: "home",component: IndexComponent},
      { path: "login", component: LoginComponent },
      {path: "",pathMatch: "full", redirectTo:"/home"} 
    ])
  ],
  providers: [ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
