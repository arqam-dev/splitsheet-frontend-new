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
  userObj;
  user_id = localStorage.getItem('userId');
  _url: string = LoopBackConfig.getPath() + "/";
  collaborationUrl = this._url + `v1/collaborations/?user_id=` + this.user_id;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog
  ) { }

  invite(id, name) {
    console.log("invite called");
    console.log("id: " + id);
    localStorage.setItem("collaboration_id", id);
    localStorage.setItem("collaboration_name", name);

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
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  ngOnInit() {
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

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
