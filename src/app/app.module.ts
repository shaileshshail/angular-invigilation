import { NgModule, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { EventsModule } from "./events/events.module";
import { AppRoutingModule } from "./app-routing.module";
import { FullEventsModule } from "./fullevent/fullevent.module";
import { RouterModule } from '@angular/router';
import { AuthModule } from "./auth/auth.module";
import { initializeApp } from "firebase/app";
import { HttpClientModule } from "@angular/common/http";
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdduserModule } from "./adduser/adduser.module";
import { ClassroomComponent } from './classroom/classroom.component';



@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [BrowserModule,RouterModule,AppRoutingModule,AuthModule,HttpClientModule, BrowserAnimationsModule],
  bootstrap: [AppComponent]
})

export class AppModule {};
