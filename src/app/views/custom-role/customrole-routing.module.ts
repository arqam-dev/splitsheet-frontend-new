import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewRoleComponent } from './add-new-role/add-new-role.component';
import { ShowAllRolesComponent } from './show-all-roles/show-all-roles.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Custom-Role'
    },
    children: [
      {
        path: '',
        // redirectTo: 'custom-role'
        component: ShowAllRolesComponent,

      },
      {
        path: 'add-new-role',
        // redirectTo: 'custom-role'
        component: AddNewRoleComponent,

      },
      {
        path: 'show-all-roles',
        // redirectTo: 'custom-role'
        component: ShowAllRolesComponent,

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomRoleRoutingModule {}
