import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { LoopBackConfig } from '../service/lb.config'

@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html"
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  url: string = LoopBackConfig.getPath() + "/";
  _registrationURL: string = this.url + `v1/users/register`;
  submitted = false;
  userData;

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,private router:Router) { }

  onClickSubmit(data) {
    this.submitted = true;
    console.log("enter in submit");
    console.log(data);

    if (this.registrationForm.invalid) {
      return;
    }
    // if(data.userName === '' || data.email === '' || data.password === '' || 
    // data.confirmPassword === '' || data.phoneNo === '' || data.roles === '')
    // {
    //   console.log("form data is required");
    // }
    else if (data.password !== data.confirmPassword) {
      console.log("password are not matched");
    }
    else {
      this.userData = {
        user_name: data.userName,
        email: data.email,
        phoneNo: data.phoneNo,
        password: data.password,
      }
      console.log("form submited");
      console.log(this.userData);
      console.log(this._registrationURL)
      this.http.post(this._registrationURL, this.userData)
        .toPromise()
        .then(response => {
          console.log("data submitted");
          console.log(response);
          this.router.navigate(['/login']);
        })
        .catch((err: HttpErrorResponse) => {
          console.log("error occuer");
          console.log(err.status);
        });
    }
  }

  get f() {
    return this.registrationForm.controls;
  }

  ngOnInit() {
    this.registrationForm = this._formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // phoneNo: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
}
