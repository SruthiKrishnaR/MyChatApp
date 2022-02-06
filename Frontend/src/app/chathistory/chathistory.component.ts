import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chathistory',
  templateUrl: './chathistory.component.html',
  styleUrls: ['./chathistory.component.css']
})
export class ChathistoryComponent implements OnInit {

  msg:String='';
  messageArray:Array<{user:String,message:String,userID:String}> = [];
  user:any=[]

  constructor(private _chat:ChatService) { }

  ngOnInit(): void {

      let id = sessionStorage.getItem('chatUser')

      if(id){
        this._chat.getSingleUser(id).subscribe((data)=>{
          this.user=JSON.parse(JSON.stringify(data))
        })
      
      this._chat.newMessageReceived()
          .subscribe(data =>          
            this.messageArray.push(data)
            );  

      }
  }

  sendMsg(){
    let loginmail=sessionStorage.getItem("loginmail");
    console.log(this.msg);
    this._chat.sendMessage({user:loginmail,  message:this.msg});
  }

  refresh(){
    this.ngOnInit()
  }

  
}
