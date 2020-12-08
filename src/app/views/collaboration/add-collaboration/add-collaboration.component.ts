import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators, NgForm } from "@angular/forms";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { LoopBackConfig } from '../../service/lb.config';

@Injectable({
  providedIn: 'root'
})
@Component({
  // selector: "app-dashboard",
  templateUrl: 'add-collaboration.component.html'
})
export class AddCollaborationComponent implements OnInit {
  userObj;
  _url: string = LoopBackConfig.getPath() + "/";
  collaborationUrl = this._url + `v1/collaborations`;

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() { }
  onSubmit(user: NgForm) {
    console.log('submit called...!');

    let user_id = localStorage.getItem('userId');

    console.log('user_id: ' + user_id);
    let collaborationObj = {
      name: user.value.name,
      started_at: new Date(user.value.started_at),
      ended_at: new Date(user.value.ended_at),
      user_id: user_id
    }

    this.http.post(this.collaborationUrl, collaborationObj)
      .toPromise()
      .then(res => {
        console.log('then of api');
        this.userObj = res;
        console.log('this.userObj.code::' + this.userObj.code)
        if (this.userObj.code != 200) {
          alert('Something went wrong!')
          return;
        };

        alert('Added new collaboration successfully!')
        this.router.navigate(['/collaborations']);
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
