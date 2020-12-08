import { Component, OnInit, ɵConsole } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoopBackConfig } from '../../service/lb.config';


@Component({
  selector: "app-show-all-modules-permissions",
  templateUrl: "./show-all-modules-permissions.component.html",
  styleUrls: ["./show-all-modules-permissions.component.css"]
})
export class ShowAllModulesPermissionsComponent implements OnInit {
  _url: string = LoopBackConfig.getPath() + "/";
  moduleListURL: string = this._url + `api/module-lists/show-modules-list`;
  allRolesURL: string = this._url + `api/custom-roles/show-all-roles`;
  updatePermissionURL: string = this._url + `api/custom-roles/upsert-role-permissions`;
  getAllPermissionURL: string = this._url + `api/permissions/show-all-permissions`;
  moduleList;
  allRolesList;
  testForm: FormGroup;
  isChecked = true;
  updatedPermissionList: any = [];
  permissionList: any = [];
  constructor(private http: HttpClient, private _formBuilder: FormBuilder ) {}

  onSubmit() {
    console.log("updated permissions");
    console.log(this.updatedPermissionList);
    this.http
      .post(this.updatePermissionURL, this.updatedPermissionList)
      .toPromise()
      .then((data: any) => {
        console.log("successfully submitted");
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error ouccred");
        console.log(err.status);
      });
  }
  onReadClick(data, isRead ,isWrite ) {
    console.log(data)
    let value:any;
    if(data.isRead != isRead)
    {
      console.log("Read is change")
      value=isRead;
    }
    if(data.isWrite != isWrite)
    {
      console.log("Write is change");
      value=isWrite;
    }
   
    //When updatedPermissionList is empty 
    if(this.updatedPermissionList.length ===0)
    {
      console.log("Updated Permission list is empty !")
  
      if(!data.isModel)
      {
        console.log("Modeles false!")
        let newPermissionObj = {
          moduleName:data.moduleName,
          roleName:data.principalId,
          isRead:isRead,
          isWrite:isWrite,
          moduleId:data.moduleId
        };
        this.updatedPermissionList.push(newPermissionObj);
      }
      else{
        console.log("Model is true!")
        let newPermissionObj = {
          moduleName:data.moduleName,
          roleName:data.principalId,
          isRead:value,
          isWrite:value,
          moduleId:data.moduleId
        };
        this.updatedPermissionList.push(newPermissionObj);

      }
    }
    else{
      //When updatedPermissionList is not empty 
      let isExist=false;
      for (let index = 0; index < this.updatedPermissionList.length; index++) {
        if(this.updatedPermissionList[index].moduleId == data.moduleId && this.updatedPermissionList[index].roleName == data.principalId)
        {
          console.log("Update")
          if(!data.isModel)
          {
            this.updatedPermissionList[index].isRead=value;
            this.updatedPermissionList[index].isWrite=value;
            isExist=true;
            break;
          }
          else{
            this.updatedPermissionList[index].isRead=isRead;
            this.updatedPermissionList[index].isWrite=isWrite;
            isExist=true;
            break;
          }
        }
      }
      if(!isExist)
      {
        console.log('Add new')
        if(!data.isModel)
          {
            let newPermissionObj = {
              moduleName:data.moduleName,
              roleName:data.principalId,
              isRead:isRead,
              isWrite:isWrite,
              moduleId:data.moduleId
            };
            this.updatedPermissionList.push(newPermissionObj);
           
          }
          else{
            let newPermissionObj = {
              moduleName:data.moduleName,
              roleName:data.principalId,
              isRead:value,
              isWrite:value,
              moduleId:data.moduleId
            };
            this.updatedPermissionList.push(newPermissionObj);
          }
      }

    }
    //console.log("Updated Permission List With new instance. . ")
    console.log(this.updatedPermissionList)

    //Bilal
    // if (data.isModel) {
    //   console.log("Data is pushed")
    //   let newPermissionObj = {
    //     moduleName: "Module 3",
    //     roleName: "Admin",
    //     isRead: 1,
    //     isWrite: 1,
    //     moduleId: 3
    //   };
    //   this.updatedPermissionList.push(newPermissionObj);
    //   console.log("Updated Permission List . . ")
    //   console.log(this.updatedPermissionList)
    // }
  
  }
  ngOnInit(): void {
    this.http
      .get(this.moduleListURL)
      .toPromise()
      .then(response => {
        this.moduleList = response;
        console.log("Module List.....  ");
        console.log(this.moduleList);
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occur");
        console.log(err.status);
      });

    this.http
      .get(this.allRolesURL)
      .toPromise()
      .then(respopnse => {
        this.allRolesList = respopnse;
        console.log(this.allRolesList);
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occur");
        console.log(err.status);
      });

    this.http
      .get(this.getAllPermissionURL)
      .toPromise()
      .then(response => {
        this.permissionList = response;
        console.log("permission list");
        console.log(this.permissionList);
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error occur");
        console.log(err.status);
      });
  }
}
