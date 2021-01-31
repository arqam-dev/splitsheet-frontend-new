// Angular
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ChatsRoutingModule } from "./chats-routing.module";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { SingleChatComponent } from './single-chat/single-chat.component';
import { NotifierModule } from 'angular-notifier';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChatsRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NotifierModule
  ],
  declarations: [
    SingleChatComponent
]
})
export class ChatsModule {}
