// Angular
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AllUsersComponent } from './all-users/all-users.component';
import { ViewAllUsersRoutingModule } from '../view-all-users/view-all-users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    ViewAllUsersRoutingModule
  ],
  declarations: [AllUsersComponent]
})
export class ViewAllUsersModule {}
