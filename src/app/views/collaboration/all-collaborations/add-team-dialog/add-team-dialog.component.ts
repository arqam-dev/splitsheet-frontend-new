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

@Component({
  selector: "add-team-dialog",
  templateUrl: "add-team-dialog.html",
})
export class AddTeamDialog implements OnInit {
  addTeamFormBuilder: FormGroup;

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
    private dialogRef: MatDialogRef<AddTeamDialog>
  ) {
    if (data) {
      console.log("data in add-quantity-dialog");
      console.log(data);

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

  inviteRes;

  addTeam(name, description) {
    console.log("Add Team called");

    let addTeamUrl = this._url + 'team';

    const project_id_for_adding_team = localStorage.getItem('project_id_for_adding_team');

    let data = {
      name: name,
      description: description,
      project_id: project_id_for_adding_team,
    }

    this.http
      .post(addTeamUrl, data)
      .toPromise()
      .then((data: any) => {
        console.log("Success added tge team");
        console.log(data);
        this.inviteRes = data;
        alert('New Team has been added!');
        this.cancel();
      })
      .catch((err: HttpErrorResponse) => {
        console.log("Error of invite");
        console.log(err);
        this.cancel();
      });
  }


  ngOnInit(): void {
    this.addTeamFormBuilder = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      team: ['', Validators.required],
    });
  }

  onSubmit(inviteObj: NgForm) {
    this.addTeam(inviteObj.value.name, inviteObj.value.description);
    return;
  }
}
