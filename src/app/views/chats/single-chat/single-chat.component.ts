import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { NotifierService } from 'angular-notifier';
import { LoopBackConfig } from '../../service/lb.config';

@Injectable()

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.component.html',
  styleUrls: ['./single-chat.component.css'],
  providers: [WebSocketService]
})
export class SingleChatComponent implements OnInit {
  currentUserMsg:any = [];
  replyForm: FormGroup;
  _url: string = LoopBackConfig.getPath() + "/" ;
  getAllUserURL = this._url + `api/custom-users/show-users-list-for-OneToOne-chat`;
  getUserMsgURL = this._url + `api/chat-histories/show-chat-messages-oneToOne`;
  receiverId;
  senderId;
  userId;
  msges:any;
  socket: SocketIOClient.Socket;
  userList:any =[];
  container;
  
  @ViewChild('scrollBottom')
  private scrollBottom: ElementRef;
  private readonly notifier: NotifierService
  
  constructor(private _fromBuilder:FormBuilder,
    private http : HttpClient,
    private webSocketService: WebSocketService,
    notifierService: NotifierService) {
      
      this.notifier = notifierService;
      
      this.webSocketService.listen("chatMessageEmitter").subscribe(
        (data) =>{
          console.log('web socket listen');
          console.log(data);
          this.notifier.notify("success","You Received a msg");
          let obj: any = data;
          let tempData = {
            senderId: obj.customUserId,
            receiverId: obj.receiverId,
            msg: obj.text
        };
        this.currentUserMsg.push(tempData); 
          
      }
      );
    }


  getUserChat(data)
  {

    this.currentUserMsg = [];
    this.msges = '';
    console.log("in get chat function");
    console.log(data + " " + this.userId);
    this.receiverId = data;
    this.userId = this.userId;
    console.log('msg receiverID......' + this.receiverId);
    this.http.get(this.getUserMsgURL,{
      params: {
        customUserId : this.userId,
        receiverId: this.receiverId
      }
    })
    .toPromise()
    .then(response => {
      this.msges = response;
      console.log('Current Chat');
      console.log(this.msges);
      for(let obj of this.msges.Response)
      {
        
        let tempData = {
          senderId: obj.customUserId,
          receiverId: obj.receiverId,
          msg: obj.text
        };

        this.currentUserMsg.push(tempData);
        console.log(tempData);
      
      }
    })
    .catch((err:HttpErrorResponse) =>
    {
      console.log("error caught");
      console.log(err.status);
    });

    
    console.log(this.currentUserMsg);
  }

  reply(data,receiverId)
  {
    if(receiverId !== 0 && data.message !== ''){
      console.log(data);
      console.log(receiverId);
      this.msges = '';
      let tempData = {
        senderId : this.userId,
        receiverId: receiverId,
        msg: data.message
      };
      console.log(tempData);
      this.sendMessageFunc(tempData);
      this.getUserChat(receiverId);
      this.replyForm.reset();
    }
  }

  sendMessageFunc(data)
  {
    console.log("Send Msg Function");
    console.log(data);
    if(data.senderId !== 0)
    {
      console.log("in if condition");
      
      let obj = {
        fileUrl: "",
        text: data.msg,
        receiverId: data.receiverId,
        date: new Date().toISOString(),
        customUserId: data.senderId
      }
      console.log(obj);
      this.webSocketService.emit("chatMessage", obj);
      
    }
  }

  scrollToBottom() : void
  {
    try{
      this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    }catch(err){}
  }
 
  ngOnInit(): void {

    this.userId = localStorage.getItem("userId");
    console.log(this.userId); 
    
    this.replyForm = this._fromBuilder.group({
      message : ['',Validators.required]
    });

    this.http.get(this.getAllUserURL,{
      params: {
        customUserId: this.userId
      }
    })
    .toPromise()
    .then(response => {
      console.log(response);
      this.userList = response;
    })
    .catch((err:HttpErrorResponse) =>{
      console.log('error caught');
      console.log(err.status);
    });  
    
    this.scrollToBottom();
  }

  ngAfterViewChecked()
  {
    this.scrollToBottom();
  }

}
