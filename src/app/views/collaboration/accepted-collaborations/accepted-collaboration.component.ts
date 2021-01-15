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
  templateUrl: 'accepted-collaboration.component.html'
})
export class AcceptedCollaborationComponent implements OnInit {
  userObj = [];
  userObjTemp;

  user_id = localStorage.getItem('userId');
  status = 1; // for accepted Projects
  _url: string = LoopBackConfig.getPath() + "/";
  collaborationUrl = this._url + `v1/projects/assigned-projects?user_id=` + this.user_id + '&status=' + this.status;

  constructor(private http: HttpClient, private router: Router) { }

  markDoneRes;
  markDone(project_id) {
    console.log('project_id');
    console.log(project_id);

    let markDoneURL = this._url + 'v1/projects/mark-as-done';

    let data = {
      project_id: project_id,
      user_id: this.user_id
    };

    this.http.post(markDoneURL, data)
      .toPromise()
      .then(res => {
        console.log('then of this getMembersAgainstCollaboration api');
        // this.markDoneRes = new Array(res);
        // this.markDoneRes = this.markDoneRes[0].data.items;
        alert('Successfully marked the project as done!');
        window.location.reload();
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err);
      });
  }

  ngOnInit(): void {
    console.log(this.collaborationUrl);
    this.http.get(this.collaborationUrl)
      .toPromise()
      .then(res => {
        console.log('then of accepted api');
        console.log(res);
        this.userObjTemp = res;
        if (this.userObjTemp != undefined) {
          console.log('this.userObj.code::' + this.userObjTemp.code)
          this.userObj = this.userObjTemp.data.items[0].projects;
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err.status);
      });
  }
}
