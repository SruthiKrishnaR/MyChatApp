import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  constructor(private auth:AuthService,public router:Router) { }
  email:any;


  ngOnInit(): void {
  }

  logoutUser(){

    this.email =sessionStorage.getItem("loginmail");

    this.auth.logOut(this.email)
    console.log(this.email);
    localStorage.removeItem('user')
    this.router.navigate(['/'])
}
}
