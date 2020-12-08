import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllUsersComponent } from '../view-all-users/all-users/all-users.component'

const routes: Routes = [
  {
    path: "",
    data: {
      title: "View-All-Users"
    },
    children: [
      {
        path: "",
        component: AllUsersComponent,

      },
      {
        path: "all-users",
        component: AllUsersComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAllUsersRoutingModule { }
