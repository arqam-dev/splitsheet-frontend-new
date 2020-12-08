import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators, NgForm } from "@angular/forms";
import { Socket } from 'ngx-socket-io';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { AuthService } from '../service/Auth/login.service';
import { Injectable } from '@angular/core';
import { LoopBackConfig } from '../service/lb.config';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  loginError = ''
  userObj;
  _url: string = LoopBackConfig.getPath() + "/";
  loginUrl = this._url + `v1/users/login`;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService,
    private socket: Socket
  ) { }
  ngOnInit() { }
  onSubmit(user: NgForm) {
    console.log('submit called...!');

    let loginObj = {
      email: user.value.email,
      password: user.value.password
    }

    this.http.post(this.loginUrl, loginObj)
      .toPromise()
      .then(res => {
        console.log('then of api');
        this.auth.loggIn();
        this.userObj = res;
        console.log('this.userObj', this.userObj);
        console.log('this.userObj.code::' + this.userObj.code)
        if (this.userObj.code != 200) {
          alert('Invalid Credentials!')
          return;
        };
        console.log('userId: ' + this.userObj.data.items[0].id);

        localStorage.setItem("userId", this.userObj.data.items[0].id);
        localStorage.setItem("user_name", this.userObj.data.items[0].user_name);
        localStorage.setItem("email", this.userObj.data.items[0].email);
        this.router.navigate(['/dashboard']);
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err.status);
      });

  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
