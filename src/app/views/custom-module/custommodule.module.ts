// Angular
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CustomModuleRoutingModule } from "./custommodule-routing.module";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { AddNewModuleComponent } from './add-new-module/add-new-module.component';
import { ShowAllModulesPermissionsComponent } from './show-all-modules-permissions/show-all-modules-permissions.component';
import { MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomModuleRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [
    AddNewModuleComponent,
    ShowAllModulesPermissionsComponent]
})
export class CustomModuleModule {}
