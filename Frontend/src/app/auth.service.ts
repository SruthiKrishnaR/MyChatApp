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
    return !!sessionStorage.getItem('user')
  }

  logOut(user:any){
    console.log(user)
    return this.http.post<any>(`${this.server_address}/logout`,user)
   .subscribe((data)=>{
      
      console.log(data)
    })

  }

}