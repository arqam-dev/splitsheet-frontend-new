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
  templateUrl: 'done-collaboration.component.html'
})
export class DoneCollaborationComponent implements OnInit {
  userObj = [];
  userObjTemp;
  user_id = localStorage.getItem('userId');
  status = 2; // for accepted Projects
  _url: string = LoopBackConfig.getPath() + "/";
  collaborationUrl = this._url + `v1/projects/assigned-projects?user_id=` + this.user_id + '&status=' + this.status;

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.http.get(this.collaborationUrl)
      .toPromise()
      .then(res => {
        // console.log('then of api');
        // console.log(res);
        this.userObjTemp = res;
        if (this.userObjTemp != undefined) {
          // this.userObj = this.userObjTemp;
          // console.log('this.userObj.code::' + this.userObjTemp.code)
          this.userObj = this.userObjTemp.data.items[0].projects;
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err.status);
      });
  }
}
