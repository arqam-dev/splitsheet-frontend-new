import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";

import { LoopBackConfig } from '../../service/lb.config';
import { TRANSITION_DURATIONS } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.css']
})
export class AboutUserComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  user_name = localStorage.getItem('user_name');
  email = localStorage.getItem('email');
  user_id = localStorage.getItem('userId');

  _url: string = LoopBackConfig.getPath() + "/";
  profileUrl = this._url + `v1/users/profile?user_id=` + this.user_id;

  isEdit = true;
  isEditFunc() {
    this.isEdit = false;
  }

  password;
  onChangePassword(e){
    // console.log('onChangePassword called');
    // console.log(e.target.value);
    this.password = e.target.value;
  }

  updateProfile() { 
    this.isEdit = true;

    let updateProfileUrl = this._url + `v1/users/update-profile`;

    let obj = {
      user_id: this.user_id,
      password: this.password
    }

    this.http
    .post(updateProfileUrl, obj)
    .toPromise()
    .then(res => {
      this.userObj = res;
      this.userObj = this.userObj.data.items;
    })
    .catch((err: HttpErrorResponse) => {
      console.log("error occuer in profile");
      console.log(err.status);
    });

    alert('Updated profile info successfully!');
  }


  userObj;
  ngOnInit(): void {
    this.http.get(this.profileUrl)
      .toPromise()
      .then(res => {
        this.userObj = res;
        this.userObj = this.userObj.data.items;
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer in profile");
        console.log(err.status);
      });
  }

}
