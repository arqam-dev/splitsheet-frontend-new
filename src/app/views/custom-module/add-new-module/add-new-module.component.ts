import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoopBackConfig } from '../../service/lb.config';

@Component({
  selector: 'app-add-new-module',
  templateUrl: './add-new-module.component.html',
  styleUrls: ['./add-new-module.component.css']
})
export class AddNewModuleComponent implements OnInit {
  // showModuleList;
  showModelList;
  showEndPointsList;
  createModuleData;
  _url: string = LoopBackConfig.getPath() + "/" ;
  // showModuleURL: string = this._url + `/module-lists/show-modules-list`;
  showModelURL: string = this._url + `api/model-lists/show-models-list`;
  showEndPointURL: string = this._url + `api/end-points/show-endpoints-list`;
  createModuleURL: string = this._url + `api/module-lists/create-module`;
  createModuleForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {}

  // onModuleValueClick(event: any) {
  //   let moduleID = event.target.value;
  //   this.http.get(this.showModelURL,{
  //     params: {
  //       moduleId : moduleID
  //     }
  //   })
  //   .toPromise()
  //   .then(response => {
  //     this.showModelList = response;
  //     console.log(this.showModelList);
  //   }).catch((err: HttpErrorResponse) =>
  //   {
  //     console.log('error occured');
  //     console.log(err.status);
  //   });

  //   this.ngOnInit();

  //   console.log(moduleID);
  // }

  onModelValueClick(modelname) {
    console.log('In Model value Click');
    let modelName = modelname;
    this.http.get(this.showEndPointURL,
      {
        params:
        {
          modelName : modelName
        }
      }).toPromise()
      .then(response => {
        this.showEndPointsList = response;
        console.log('End Points List');
        console.log(this.showEndPointsList);
      }).catch((err: HttpErrorResponse) => {
        console.log('error occured');
        console.log(err.status);
      });
    console.log('Model name .......   ' + modelName );
    // this.ngOnInit();
  }

  onClickSubmit(data) {
    this.createModuleData = {
      name: data.name,
      description: data.description,
      parentId: 0,
      modelName: data.modelNameList,
      endPointName: data.endPointsList
    };
    this.http.post(this.createModuleURL, this.createModuleData)
    .toPromise()
    .then((data: any) => {
      console.log('data submited');
    })
    .catch((err: HttpErrorResponse) => {
      console.log('error occur');
      console.log(err.status);
    });
    console.log(this.createModuleData);
  }

  ngOnInit(): void {
    this.createModuleForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      // moduleNameList: ['', Validators.required],
      modelNameList: ['', Validators.required],
      endPointsList: ['', Validators.required]
    });

    this.http
      .get(this.showModelURL)
      .toPromise()
      .then(response => {
        this.showModelList = response;
        console.log(this.showModelList);
      })
      .catch((err: HttpErrorResponse) => {
        console.log('error occur');
        console.log(err.status);
      });
  }
}
