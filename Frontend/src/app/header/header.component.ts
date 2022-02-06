import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css','../chatroom/chatroom.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }  
  email:any;
  
  ngOnInit(): void {
  }

  logoutUser(){

      this.email =sessionStorage.getItem("loginmail");

      this.auth.logOut(this.email)
      console.log(this.email);
      sessionStorage.removeItem('user')
      this.router.navigate(['/'])
  }

}
