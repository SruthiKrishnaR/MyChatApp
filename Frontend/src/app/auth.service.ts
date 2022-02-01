import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private socket: Socket;
 
  server_address:String = 'http://localhost:5200';
  constructor(private http:HttpClient) { 
    this.socket = io('http://localhost:5200',{ transports: ['websocket','polling', 'flashback']})
  }

 

  joinRoom(data: any): void {
    this.socket.emit('join', data);
  }

  // sendMessage(data: any): void {
  //   this.socket.emit('message', data);
  // }

  // getMessage(): Observable<any> {
  //   return new Observable<{user: string, message: string}>(observer => {
  //     this.socket.on('new message', (data) => {
  //       observer.next(data);
  //     });

  //     return () => {
  //       this.socket.disconnect();
  //     }
  //   });
  // }

  getStorage() {
    const storage : any = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data: any) {
    localStorage.setItem('chats', JSON.stringify(data));
  }


  //login and reg
  userSignup(user:any){
    return this.http.post<any>(`${this.server_address}/signup`,user)
  }

  userlogin(user:any){
    return this.http.post<any>(`${this.server_address}/login`,user)
  }

  userLoggedIn(){
    return !!localStorage.getItem('user')
  }


}