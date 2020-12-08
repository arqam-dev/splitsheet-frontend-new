import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { LoopBackConfig } from '../../service/lb.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  _url: string = LoopBackConfig.getPath() + "/" ;
  profiledata = this._url + `api/custom-users/`;
  editProfileURL = this._url + `api/custom-users/edit-profile`;
  user: any
  profileUpdateForm: FormGroup;
  submitted = false;
  constructor(private http: HttpClient,
    private _formBuilder: FormBuilder) {

  }

  onSelectFile(event)
  {
    console.log(event);
  }

  formSubmit(data)
  {
    this.submitted = true;
    console.log("update form data");
    console.log(data);
    if(this.profileUpdateForm.invalid)
    {
      return;
    }
    else
    {
      let userUpdateData = {
        id : this.user.id,
        phoneNo: data.phoneNo,
        firstName: data.firstName,
        secondName: data.lastName,
        description: data.about
      };

      console.log(userUpdateData);

      // this.http.post(this.editProfileURL, userUpdateData)
      // .toPromise()
      // .then(response => {
      // console.log(response);

      // })
      // .catch((err:HttpErrorResponse) => {
      //   console.log('error caught');
      //   console.log(err.status);
      // });
    }
    
  }
  get f()
  {
    return this.profileUpdateForm.controls;
  }
  ngOnInit() {

    this.profileUpdateForm = this._formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      about: ['',Validators.required],
      phoneNo: ['',Validators.required]
    });
    console.log("profile view");
    let id = localStorage.getItem('userId');
    this.http.get(this.profiledata + id).subscribe(data => {
      console.log(data)
     this.user = data;
    })

  }

}
