import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {

  constructor(private chat:ChatService,private router:Router,private auth:AuthService) { }
  count:any=0
  email:any=''
  user:any=[]
  group:any=[]
  gcount:any=0
  groupname: any='';
  // ingroup:any=''

  ngOnInit(): void {

    this.email=sessionStorage.getItem('email')
    this.chat.getUser(this.email).subscribe((data)=>{
      console.log(data);
      
      this.user=JSON.parse(JSON.stringify(data))
      console.log(this.user);
      this.count=this.user.length-1
      console.log(this.count);
      this.chat.getGroups().subscribe((data)=>{
        this.group=JSON.parse(JSON.stringify(data))
        console.log(this.group);
        
        this.gcount=this.group.length
      })
    })
    
  }

  createGroup(){

    this.chat.createGroup(this.groupname).subscribe(
      data=>{
        alert("group created successfully")
        this.ngOnInit()
      },
      err=>{
        alert(err.error)
        this.ngOnInit()
      }
    )
    
   }

   chatUser(user:any){
    console.log(user);
    sessionStorage.setItem('chatUser',user._id)
    sessionStorage.setItem('chat','private')
    sessionStorage.setItem('private','yes')
    sessionStorage.removeItem('group')
   window.location.reload();
  }
  chatGroup(group:any){
    console.log(group);
    sessionStorage.setItem('chatGroup',group._id)
    sessionStorage.setItem('chat','group')
    sessionStorage.setItem('group','yes')
    sessionStorage.removeItem('private')
    

    window.location.reload();
  }


  
}
