import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {

  constructor(private chat:ChatService,private router:Router) { }
  count:any=0
  email:any=''
  user:any=[]
  groupname: any='';


  createGroup(){
    console.log(this.groupname);
  }
   
  ngOnInit(): void {

      this.email=sessionStorage.getItem('email');
      this.chat.getUser(this.email).subscribe((data)=>{
        console.log(data);
        this.user=JSON.parse(JSON.stringify(data))
        console.log(this.user);
        this.count=this.user.length-1
        // console.log(this.count);
        
      })
    
  }

  chatUser(user:any){
    console.log(user);
    sessionStorage.setItem('chatUser',user._id);
    // this.router.navigate(['/'])
    window.location.reload()

    // .then(() => {
    //   window.location.reload();

    // });
  }

  

  
}
