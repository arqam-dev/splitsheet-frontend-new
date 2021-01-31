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

  
  // // // // // 

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Total Project', 'Total Invites', 'Accepted', 'Rejected', 'Pending'];
  public barChartType = 'bar';
  public barChartLegend = true;

  // public barChartData: any[] = [
  //   { data: [65, 59, 80, 81], label: 'Project Overview' },
  // ];
  public barChartData: any[] = [
    { data: [65, 59, 80, 81], label: 'Project Overview' },
  ];


  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
  // // // // // 

  collaborationsArr = [];
  membersArr = [];

  totalCollaborations;
  totalCollaborationsCount;
  acceptedCollaborations;
  rejectedCollaborations;
  pandingCollaborations;
  dashbordRes;

  getChartsData() {
     this.barChartData = [
      { data: [65, 59, 80, 81], label: 'Project Overview' },
      // { data: [28, 48, 40, 19], label: 'Series B' }
    ];
  }

  getDashboardItems(user_id) {
    let dashboardUrl = this._url + 'v1/users/dashboard/?user_id=' + user_id;
    this.http.get(dashboardUrl)
      .toPromise()
      .then(res => {
        // console.log('then of dashboard api');
        this.dashbordRes = res;
        this.totalCollaborations = this.dashbordRes.data.items[0].total_projects;
        this.totalCollaborationsCount = this.dashbordRes.data.items[0].total_invites;
        this.acceptedCollaborations = this.dashbordRes.data.items[0].total_accepted_invites;
        this.rejectedCollaborations = this.dashbordRes.data.items[0].total_rejected_invites;
        this.pandingCollaborations = this.dashbordRes.data.items[0].padding_invites;
        // this.totalCollaborations = new Array(res);
        // console.log(this.totalCollaborations)

        // this.totalCollaborationsCount = this.totalCollaborations[0].data.items[0].totalCollaborations;
        // this.acceptedCollaborations = this.totalCollaborations[0].data.items[0].acceptedCollaborations;
        // this.rejectedCollaborations = this.totalCollaborations[0].data.items[0].rejectedCollaborations;

        // console.log('this.rejectedCollaborations');
        // console.log(this.rejectedCollaborations);
        // if (this.totalCollaborationsCount == undefined) this.totalCollaborationsCount = 0;
        // if (this.acceptedCollaborations == undefined) this.acceptedCollaborations = 0;
        // if (this.rejectedCollaborations == undefined) this.rejectedCollaborations = 0;

        this.barChartData = [
          { data: [this.totalCollaborations, this.totalCollaborationsCount, this.acceptedCollaborations, this.rejectedCollaborations, this.pandingCollaborations], label: 'Project Overview' },
          // { data: [28, 48, 40, 19], label: 'Series B' }
        ];

      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer in dashboard");
        console.log(err);
      });
  }

  getAllCollaborations(user_id) {
    let collaborationUrl = this._url + 'v1/projects/?user_id=' + user_id;
    this.http.get(collaborationUrl)
      .toPromise()
      .then(res => {
        // console.log('then of api');
        this.collaborationsArr = new Array(res);
        this.collaborationsArr = this.collaborationsArr[0].data.items;
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err.status);
      });
  }

  getMembersAgainstCollaboration(project_id) {
    let projectUrl = this._url + 'v1/team/teams-against-project/?project_id=' + project_id;

    this.http.get(projectUrl)
      .toPromise()
      .then(res => {
        // console.log('then of this getMembersAgainstCollaboration api');
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


  defaultCollaborationName = 'No Projects';
  async ngOnInit() {
    await this.getDashboardItems(this.user_id);
    await this.getAllCollaborations(this.user_id);
    await this.waitForOneSecond();
    // console.log('this.collaborationsArr');
    // console.log(this.collaborationsArr);
    let defaultCollaborationId = this.collaborationsArr[0].id;
    this.defaultCollaborationName = this.collaborationsArr[0].name;
    this.getMembersAgainstCollaboration(defaultCollaborationId);
  }

}
