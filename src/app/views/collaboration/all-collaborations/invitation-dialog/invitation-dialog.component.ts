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
  ProductInfoForm: FormGroup;

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

  invite(email) {
    console.log("invite called");

    let inviteUrl = this._url + 'users/invite';

    const collaboration_id = localStorage.getItem('collaboration_id');
    const collaboration_name = localStorage.getItem('collaboration_name');
    const user_name = localStorage.getItem('user_name');

    console.log('user_name: ' + user_name);
    console.log('collaboration_name: ' + collaboration_name);

    let data = {
      email: email,
      collaboration_id: collaboration_id,
      user_name: user_name,
      collaboration_name: collaboration_name
    }
    this.http
      .post(inviteUrl, data)
      .toPromise()
      .then((data: any) => {
        console.log("Success of invitation");
        console.log(data);
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
    this.ProductInfoForm = this._formBuilder.group({
      quantity: [""],
      price: [""],
    });
    let productInfoFuncId = localStorage.getItem("productInfoFuncId");
    this.showProductDetailsFunc(productInfoFuncId);

  }

  onSubmit(inviteObj: NgForm) {
    this.invite(inviteObj.value.email);
    return;
  }
}
