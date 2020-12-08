import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoopBackConfig } from '../../service/lb.config';

@Component({
  selector: 'app-show-all-roles',
  templateUrl: './show-all-roles.component.html',
  styleUrls: ['./show-all-roles.component.css']
})
export class ShowAllRolesComponent implements OnInit {
  showRoleList;
  url: string = LoopBackConfig.getPath() + "/" ;
  _url: string = this.url + `api/custom-roles/show-all-roles`;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http
    .get(this._url)
    .toPromise()
    .then(respponse => {
      this.showRoleList = respponse;
      console.log(this.showRoleList);
    })
    .catch((err: HttpErrorResponse) => {
      console.log('error occur');
      console.log(err.status);
    }
    );
  }

}
