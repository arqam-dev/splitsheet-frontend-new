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
import { MatDialogConfig } from '@angular/material';
import { InvitationDialog } from "./invitation-dialog/invitation-dialog.component";
import { AddTeamDialog } from "./add-team-dialog/add-team-dialog.component";
import {
  MatDialog,
} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
@Component({
  templateUrl: 'collaboration.component.html'
})
export class CollaborationComponent implements OnInit {
  userObj = [];
  userObjTemp;

  resObj;
  user_id = localStorage.getItem('userId');
  _url: string = LoopBackConfig.getPath() + "/";
  collaborationUrl = this._url + `v1/projects/?user_id=` + this.user_id;

  teams = [];
  min = 0;
  max = 0;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog
  ) { }

  // getPercentageAndTeam(project_id) {
  //   let getPercentageAndTeamURL = this._url + `v1/projects/remaining-percentage/?project_id=` + project_id;

  //   this.http.get(getPercentageAndTeamURL)
  //     .toPromise()
  //     .then(res => {
  //       console.log('then of getPercentageAndTeam api');
  //       this.resObj = res;

  //       this.resObj = this.resObj.data.items;
  //       this.teams = this.resObj.teams;
  //       this.min = this.resObj.min;
  //       this.max = this.resObj.max;
  //     })
  //     .catch((err: HttpErrorResponse) => {
  //       console.log("error occuer");
  //       console.log(err.status);
  //     });
  // }

  async invite(id, name) {
    // console.log("invite called");
    // console.log("id: " + id);
    localStorage.setItem("collaboration_id", id);
    localStorage.setItem("collaboration_name", name);

    // await this.getPercentageAndTeam(id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogData = {
      product_id: localStorage.getItem("productInfoFuncId"),
    };

    const dialogRef = this.dialog.open(InvitationDialog, {
      data: {
        message: "Are you sure want to delete?",
        buttonText: {
          ok: "Save",
          cancel: "No",
        },
        dialogData: dialogData,
      },
      // height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  addTeam(id, name) {
    localStorage.setItem("project_id_for_adding_team", id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogData = {
      product_id: localStorage.getItem("productInfoFuncId"),
    };

    const dialogRef = this.dialog.open(AddTeamDialog, {
      data: {
        message: "Are you sure want to delete?",
        buttonText: {
          ok: "Save",
          cancel: "No",
        },
        dialogData: dialogData,
      },
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  ngOnInit() {
    this.http.get(this.collaborationUrl)
      .toPromise()
      .then(res => {
        this.userObjTemp = res;
        if (this.userObjTemp != undefined) {
          // console.log(this.userObjTemp.data.items[0]);
          this.userObj = this.userObjTemp.data.items;
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err);
      });
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
