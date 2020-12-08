import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddNewModuleComponent } from "./add-new-module/add-new-module.component";
import { ShowAllModulesPermissionsComponent } from "./show-all-modules-permissions/show-all-modules-permissions.component";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Custom-Module"
    },
    children: [
      {
        path: "",
        component: ShowAllModulesPermissionsComponent,

      },
      {
        path: "add-new-module",
        component: AddNewModuleComponent,

      },
      {
        path: "show-all-modules-permissions",
        component: ShowAllModulesPermissionsComponent,

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomModuleRoutingModule {}
