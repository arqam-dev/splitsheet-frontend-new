import { Component, Inject } from "@angular/core";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { LoopBackConfig } from "../../../service/lb.config";
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from "@angular/forms";
import { OnInit } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "invitation-dialog",
  templateUrl: "invitation-dialog.html",
})
export class InvitationDialog implements OnInit {
  inviteFormBuilder: FormGroup;

  _url: string = LoopBackConfig.getPath() + "/v1/";
  access_token = localStorage.getItem("access_token");

  message: string = "Are you sure?";
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";
  dialogData;
  productDetailres = [];
  productCreatedDateCustom;
  productName;
  lastQuantity;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<InvitationDialog>
  ) {
    if (data) {
      // console.log("data in add-quantity-dialog");
      // console.log(data);

      this.message = data.message || this.message;
      this.dialogData = data.dialogData;

      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  cancel() {
    this.dialog.closeAll();
  }

  selectedTeam(team_id) {
    localStorage.setItem('selected_team_id', team_id);
  }

  inviteRes;
  min;
  max;
  resObj;
  teams;
  getPercentageAndTeam(project_id) {
    // console.log('getPercentageAndTeam called...!');

    let getPercentageAndTeamURL = this._url + `projects/remaining-percentage/?project_id=` + project_id;

    this.http.get(getPercentageAndTeamURL)
      .toPromise()
      .then(res => {
        // console.log('then of getPercentageAndTeam api');
        this.resObj = res;

        // console.log(this.resObj);
        this.resObj = this.resObj.data.items[0];
        this.teams = this.resObj.teams;
        this.min = this.resObj.min;
        this.max = this.resObj.max;
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err.status);
      });
  }

  invite(email, percentage) {
    // console.log("invite called");

    let inviteUrl = this._url + 'users/invite';

    const collaboration_id = localStorage.getItem('collaboration_id');
    const collaboration_name = localStorage.getItem('collaboration_name');
    const user_name = localStorage.getItem('user_name');

    // email, team_id, project_id, percentage

    let data = {
      email: email,
      team_id: localStorage.getItem('selected_team_id'),
      project_id: collaboration_id,
      user_name: user_name,
      project_name: collaboration_name,
      percentage: percentage
    }
    this.http
      .post(inviteUrl, data)
      .toPromise()
      .then((data: any) => {
        // console.log("Success of invitation");
        // console.log(data);
        this.inviteRes = data;
        alert('Invitation sent successfully!');
        this.cancel();
      })
      .catch((err: HttpErrorResponse) => {
        console.log("Error of invite");
        console.log(err);
        this.cancel();
      });
  }

  showProductDetailsFunc(productInfoFuncId) {
    let showProductDetailsUrl =
      this._url + "auth/products/" + productInfoFuncId;

    const token = this.access_token;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const options = {
      headers: headers,
    };
  }

  ngOnInit(): void {
    this.inviteFormBuilder = this._formBuilder.group({
      email: ['', Validators.required],
      percentage: ['', Validators.required],
      team: ['', Validators.required],
    });

    const collaboration_id = localStorage.getItem('collaboration_id');
    this.getPercentageAndTeam(collaboration_id);

    let productInfoFuncId = localStorage.getItem("productInfoFuncId");
    this.showProductDetailsFunc(productInfoFuncId);

  }

  onSubmit(inviteObj: NgForm) {
    this.invite(inviteObj.value.email, inviteObj.value.percentage);
    return;
  }
}
