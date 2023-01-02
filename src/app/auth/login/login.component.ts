import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { app } from 'src/app/firebase.config';
import { Form } from 'src/app/interfaces/form';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService:AuthService,private router:Router){}
  src='/assets/btn_google_signin_light_normal_web@2x.png';
  form:Form={
    email:'',
    password:''
  }
  mouseEnter(){
    this.src='/assets/btn_google_signin_light_focus_web@2x.png';
  }
  mouseLeave(){
    this.src='/assets/btn_google_signin_light_normal_web@2x.png';
  }
  submit(){
    console.log(this.form);
    this.authService.login(this.form);
  }
  isLoading(){
    return this.authService.isLoading;
  }
  signInWithGoogle(){
    this.src='/assets/btn_google_signin_light_pressed_web@2x.png';

      this.authService.signInGoogle();
  }
}
