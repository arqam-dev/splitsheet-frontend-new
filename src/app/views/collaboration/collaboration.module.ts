import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { CollaborationComponent } from './all-collaborations/collaboration.component';
import { PendingCollaborationComponent } from './pending-collaborations/pending-collaboration.component';
import { AcceptedCollaborationComponent } from './accepted-collaborations/accepted-collaboration.component';
import { RejectedCollaborationComponent } from './rejected-collaborations/rejected-collaboration.component';
import { AddCollaborationComponent } from './add-collaboration/add-collaboration.component';
import { CollaborationRoutingModule } from './collaboration-routing.module';

// Angular
import { CommonModule } from "@angular/common";
import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule,
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { InvitationDialog } from "./all-collaborations/invitation-dialog/invitation-dialog.component";

import { AppComponent } from "../../app.component";



@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    CollaborationRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [CollaborationComponent, PendingCollaborationComponent, RejectedCollaborationComponent, AddCollaborationComponent, AcceptedCollaborationComponent, InvitationDialog],
  entryComponents: [InvitationDialog],
})
export class CollaborationModule { }
