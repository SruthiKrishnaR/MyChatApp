import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chathistory',
  templateUrl: './chathistory.component.html',
  styleUrls: ['./chathistory.component.css']
})
export class ChathistoryComponent implements OnInit {

  msg:String='';
  messageArray:Array<{user:String,message:String,userID:String}> = [];

  constructor(private _chat:ChatService) { }

  ngOnInit(): void {
    
    this._chat.newMessageReceived()
        .subscribe(data =>          
          this.messageArray.push(data)
          );
  }

  sendMsg(){
    console.log(this.msg);
    this._chat.sendMessage(this.msg);
  }

  
}
