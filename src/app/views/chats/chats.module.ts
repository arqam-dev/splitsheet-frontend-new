// Angular
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ChatsRoutingModule } from "./chats-routing.module";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { SingleChatComponent } from './single-chat/single-chat.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NotifierModule } from 'angular-notifier';

const config: SocketIoConfig = {
  url: `http://192.168.0.106`,
  options: {}
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChatsRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    SocketIoModule.forRoot(config),
    NotifierModule
  ],
  declarations: [
    SingleChatComponent
]
})
export class ChatsModule {}
