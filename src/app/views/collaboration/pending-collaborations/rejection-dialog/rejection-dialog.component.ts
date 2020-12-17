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
  selector: "rejection-dialog",
  templateUrl: "rejection-dialog.html",
})
export class RejectionDialog implements OnInit {
  ProductInfoForm: FormGroup;

  userObj;
  user_id = localStorage.getItem('userId');
  _url: string = LoopBackConfig.getPath() + "/";

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
    private dialogRef: MatDialogRef<RejectionDialog>
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
    localStorage.setItem('isRejected', 'false');
    this.dialog.closeAll();
  }

  inviteRes;

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
  }

  onSubmit(rejectionObj: NgForm) {
    localStorage.setItem('isRejected', 'true');
    localStorage.setItem('rejectionReason', rejectionObj.value.reason);

    console.log('rejectionObj.value.reason: ' + rejectionObj.value.reason)

    let collaborationObj = {
      user_id: this.user_id,
      collaboration_id: localStorage.getItem('collaboration_id'),
      status: -1,
      reason: rejectionObj.value.reason
    }

    let collaborationUrl = this._url + `v1/collaborations/accept-reject-collaboration?user_id=` + this.user_id + '&status=' + '-1';
    this.http.post(collaborationUrl, collaborationObj)
      .toPromise()
      .then(res => {
        console.log('then of api');
        // if (this.userObj.code == 200) {
        alert('Rejected collaboration successfully');
        this.dialog.closeAll();
        window.location.reload();
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occuer");
        console.log(err.status);
        return;
      });

    return;
  }
}
