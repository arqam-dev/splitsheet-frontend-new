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

@Component({
  templateUrl: 'rejected-collaboration.component.html'
})
export class RejectedCollaborationComponent implements OnInit {
  userObj;
  user_id = localStorage.getItem('userId');
  status = -1; // for accepted collaborations
  _url: string = LoopBackConfig.getPath() + "/";
  collaborationUrl = this._url + `v1/collaborations/assigned-collaborations?user_id=` + this.user_id + '&status=' + this.status;

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.http.get(this.collaborationUrl)
      .toPromise()
      .then(res => {
        console.log('then of api');
        this.userObj = res;
        console.log('this.userObj.code::' + this.userObj.code)
        if (this.userObj.code != 200) {
          alert('Something went wrong!')
          return;
        };
        this.userObj = this.userObj.data.items;
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err.status);
      });
  }
}
