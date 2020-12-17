// Angular
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { UserProfileRoutingModule } from "./user-profile-routing.module";

import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AboutUserComponent } from "./about-user/about-user.component";

import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";

import { AppComponent } from "../../app.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserProfileRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule
  ],
  entryComponents: [
  ],
  declarations: [
    AboutUserComponent
  ]
})
export class ProfileModule { }
