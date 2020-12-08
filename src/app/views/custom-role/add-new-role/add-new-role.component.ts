import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import  { LoopBackConfig } from '../../service/lb.config';

@Component({
  selector: 'app-add-new-role',
  templateUrl: './add-new-role.component.html',
  styleUrls: ['./add-new-role.component.css']
})
export class AddNewRoleComponent implements OnInit {
  createRoleForm: FormGroup;
  createRoleData;
  url: string = LoopBackConfig.getPath() + "/";
  _url: string = this.url + `api/custom-roles/create-custom-role`;
  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.createRoleForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onClickSubmit(data) {

    this.createRoleData = {
      name: data.name,
      description: data.description
    };
    this.http.
    post(this._url, this.createRoleData).
    toPromise().then((data: any) => {
      console.log(this.createRoleData);
     }).catch((err: HttpErrorResponse) => {
      console.log('Error occured');
      console.log(err.status);
    });
    console.log(this.createRoleData);
  }
}
