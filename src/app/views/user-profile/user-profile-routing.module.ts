import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutUserComponent } from './about-user/about-user.component';


const routes: Routes = [
  {
    path: "",
    data: {
      title: "User-Profile"
    },
    children: [
      {
        path: "",
        component: AboutUserComponent,

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
