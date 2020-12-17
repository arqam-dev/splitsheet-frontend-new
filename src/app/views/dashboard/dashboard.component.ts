import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { LoopBackConfig } from '../service/lb.config';


import { FormControl, FormGroup, Validators, NgForm } from "@angular/forms";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  _url: string = LoopBackConfig.getPath() + "/";
  user_id = localStorage.getItem('userId');

  collaborationsArr;
  membersArr;

  totalCollaborations;
  totalCollaborationsCount;
  acceptedCollaborations;
  rejectedCollaborations;

  getDashboardItems(user_id) {
    let dashboardUrl = this._url + 'v1/users/dashboard/?user_id=' + user_id;
    this.http.get(dashboardUrl)
      .toPromise()
      .then(res => {
        console.log('then of dashboard api');
        this.totalCollaborations = new Array(res);
        console.log(this.totalCollaborations)

        this.totalCollaborationsCount = this.totalCollaborations[0].data.items[0].totalCollaborations;
        this.acceptedCollaborations = this.totalCollaborations[0].data.items[0].acceptedCollaborations;
        this.rejectedCollaborations = this.totalCollaborations[0].data.items[0].rejectedCollaborations;

        console.log('this.rejectedCollaborations');
        console.log(this.rejectedCollaborations);
        if(this.totalCollaborationsCount == undefined) this.totalCollaborationsCount = 0;
        if(this.acceptedCollaborations == undefined) this.acceptedCollaborations = 0;
        if(this.rejectedCollaborations == undefined) this.rejectedCollaborations = 0;
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer in dashboard");
        console.log(err);
      });
  }

  getAllCollaborations(user_id) {
    let collaborationUrl = this._url + 'v1/collaborations/?user_id=' + user_id;
    this.http.get(collaborationUrl)
      .toPromise()
      .then(res => {
        console.log('then of api');
        this.collaborationsArr = new Array(res);
        this.collaborationsArr = this.collaborationsArr[0].data.items;
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err.status);
      });
  }

  getMembersAgainstCollaboration(collaboration_id) {
    let collaborationUrl = this._url + 'v1/collaborations/users-against-collaboration/?collaboration_id=' + collaboration_id;

    console.log('collaboration_id');
    console.log(collaboration_id);

    this.http.get(collaborationUrl)
      .toPromise()
      .then(res => {
        console.log('then of api');
        this.membersArr = new Array(res);
        this.membersArr = this.membersArr[0].data.items;
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err.status);
      });
  }

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 1000);
    });
  }

  defaultCollaborationName;
  async ngOnInit() {
    await this.getDashboardItems(this.user_id);
    await this.getAllCollaborations(this.user_id);
    await this.waitForOneSecond();
    console.log('this.collaborationsArr');
    console.log(this.collaborationsArr);
    let defaultCollaborationId = this.collaborationsArr[0].id;
    this.defaultCollaborationName = this.collaborationsArr[0].name;
    this.getMembersAgainstCollaboration(defaultCollaborationId);
  }
}
