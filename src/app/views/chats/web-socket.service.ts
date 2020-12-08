import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';
import { LoopBackConfig } from '../service/lb.config';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  readonly url: string = LoopBackConfig.getPath() ;
  constructor() {
    this.socket = io(this.url);
   }
  

  listen(eventName: string)
  {
    return new Observable((Subscriber) => {
      this.socket.on(eventName,(data) =>{
        Subscriber.next(data);
      })
    });
  }

  emit(eventName: string, data:any)
  {
    this.socket.emit(eventName,data);
  }
}
