import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;

  server_address:String = 'http://localhost:5200';
  constructor(private http:HttpClient) { 
    this.socket = io('http://localhost:5200',{ transports: ['websocket','polling', 'flashback']})
  }

  sendMessage(data: any): void {
    this.socket.emit('message', data);
  }

  newMessageReceived(){
    let observable = new Observable<{user:String, message:String, userID:String}>(observer=>{
        this.socket.on('new message', (data:any)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
  }
}
