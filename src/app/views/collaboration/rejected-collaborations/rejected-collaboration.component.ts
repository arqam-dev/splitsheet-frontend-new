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
  userObj = [];
  userObjTemp;
  user_id = localStorage.getItem('userId');
  status = -1; // for accepted Projects
  _url: string = LoopBackConfig.getPath() + "/";
  collaborationUrl = this._url + `v1/projects/assigned-projects?user_id=` + this.user_id + '&status=' + this.status;

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.http.get(this.collaborationUrl)
      .toPromise()
      .then(res => {
        this.userObjTemp = res;
        if (this.userObjTemp != undefined) {
          // this.userObj = this.userObjTemp;
          this.userObj = this.userObjTemp.data.items[0].projects;
        }
      })
      .catch((err: HttpErrorResponse) => {
        // console.log("error occuer");
        // console.log(err.status);
      });
  }
}
