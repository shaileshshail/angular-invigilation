import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { app } from '../firebase.config';
import { Form } from '../interfaces/form';
import { HttpClient } from '@angular/common/http';
import { FastapiService } from './fastapi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  constructor(private router: Router, private htpp: HttpClient, private fastapi: FastapiService) { }
  ngOnInit(): void {
    this.alreadyLoggedIn();
  }
  result: any;
  isAuthenticated: boolean = false;
  isLoading: boolean = false;

  accesstoken!:any;
  setisAuthenticated() {
    this.isAuthenticated = true;
  }
  resetisAuthenticated() {
    this.isAuthenticated = false;
  }

  login(form: Form) {
    if (this.isLoading) return;
    this.isLoading = true;
    const auth = getAuth(app); /** app from firebase config file */
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        this.isAuthenticated = true;
        this.router.navigate(['events']);
        this.result = userCredential;
        // Signed in
        const user = userCredential.user;
        console.log(userCredential)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
      .finally(() => { this.isLoading = false })
  }
  logout() {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        this.router.navigateByUrl('login');
        this.isAuthenticated = false;
        localStorage.clear()
      })
      .catch((error) => {
        // An error happened.
      });
  }

  getIdtoken() {
    this.result.user.getIdToken().then((id: string) => {
      console.log(id);
      return id;
    }).catch((error: any) => {
      console.log(error);
    })
  }
  alreadyLoggedIn() {
    if (this.verifyIdToken(localStorage.getItem('result'))) {
      this.result=localStorage.getItem('result')
      this.result=JSON.parse(this.result)
      this.tokenSend()
      console.log('already logged in')
      this.setisAuthenticated();
      this.router.navigateByUrl('events');
    }
    else {
      console.log('else')
      this.resetisAuthenticated();
      this.router.navigateByUrl('');

    }
  }


  verifyIdToken(idToken: any) {
    if (idToken == null) {
      return false;
    }
    return this.htpp.get("https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken);
  }

  signInGoogle() {
    const auth = getAuth(app); /** app from firebase config file */
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        this.result = result;
        console.log(result);
        localStorage.setItem("result",JSON.stringify(this.result))
        this.tokenSend();
      })
      .catch((error) => {
        console.log(error);
      })
  }
  tokenSend() {
    this.fastapi.logingoogle(this.result._tokenResponse).subscribe(
      (data) => {
        if(data=='expired'){
          localStorage.clear();
        }
        else{
          console.log(data);
          this.setisAuthenticated();
          this.accesstoken=data;
          console.log(this.accesstoken)
          localStorage.setItem("accesstoken",this.accesstoken);

          setTimeout(() =>
          {
            this.router.navigateByUrl('events');
          },
          1000);
        }

      },
      (error)=>{
        console.log(error.code);
      }
    );
  }

}
