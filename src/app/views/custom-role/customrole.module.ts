// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CustomRoleRoutingModule } from './customrole-routing.module';
import { AddNewRoleComponent } from './add-new-role/add-new-role.component';
import { ShowAllRolesComponent } from './show-all-roles/show-all-roles.component';

import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomRoleRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule
  ],
  declarations: [AddNewRoleComponent, ShowAllRolesComponent]
})
export class CustomRoleModule {}
