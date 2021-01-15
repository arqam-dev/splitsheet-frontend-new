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
import { RejectionDialog } from "./rejection-dialog/rejection-dialog.component";
import {
  MatDialog,
} from "@angular/material/dialog";

@Component({
  templateUrl: 'pending-collaboration.component.html'
})
export class PendingCollaborationComponent implements OnInit {
  userObj = new Array();
  userObjTemp;

  user_id = localStorage.getItem('userId');
  status = 0; // for pending collaborations
  _url: string = LoopBackConfig.getPath() + "/";

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { }

  rejectionReason(reason) {
    console.log("rejectionReason called");

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(RejectionDialog, {
      data: {
        message: "Are you sure want to delete?",
        buttonText: {
          ok: "Save",
          cancel: "No",
        },
        // dialogData: dialogData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  ngOnInit(): void {

    let collaborationUrl = this._url + `v1/projects/assigned-projects?user_id=` + this.user_id + '&status=0';
    this.http.get(collaborationUrl)
      .toPromise()
      .then(res => {
        console.log('then of api');
        console.log(res);
        this.userObjTemp = res;
        if (this.userObjTemp != undefined) {
          // this.userObj = this.userObjTemp;
          console.log('this.userObj.code::' + this.userObjTemp.code)
          this.userObj = this.userObjTemp.data.items[0].projects;
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err.status);
      });
  }

  acceptCollaboration(collaboration_id) {
    console.log('acceptCollaboration called!');

    let collaborationObj = {
      user_id: this.user_id,
      project_id: collaboration_id,
      status: 1,
    }
    let collaborationUrl = this._url + `v1/projects/accept-reject-project?user_id=` + this.user_id + '&status=' + '1';

    this.http.post(collaborationUrl, collaborationObj)
      .toPromise()
      .then(res => {
        console.log('then of api accepted');
        console.log(res);
        // if (this.userObj.code == 200) {
        alert('Accepted collaboration successfully');
        window.location.reload();
        // return;
        // } 
        // else if (this.userObj.code != 200) {
        //   alert('Something went wrong!')
        // }
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err.status);
        return;
      });
  }

  rejectCollaboration(collaboration_id) {
    console.log('rejectCollaboration called!');

    localStorage.setItem('collaboration_id', collaboration_id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(RejectionDialog, {
      data: {
        message: "Are you sure want to delete?",
        buttonText: {
          ok: "Save",
          cancel: "No",
        },
        // dialogData: dialogData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
}
