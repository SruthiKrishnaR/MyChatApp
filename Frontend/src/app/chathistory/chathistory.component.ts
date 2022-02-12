import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chathistory',
  templateUrl: './chathistory.component.html',
  styleUrls: ['./chathistory.component.css']
})
export class ChathistoryComponent implements OnInit {
  imagemodel:any
  msg:String='';
  messageArray:Array<{user:String,message:String,userID:String,time:String,imgfile:String}> = [];
  user:any=[];
  room:any=''
  
  constructor(private _chat:ChatService) { }
  usermail:any='';
  id:any=''

  ngOnInit(): void {
        this.id = sessionStorage.getItem('chatUser')
        if(this.id){
          setInterval(()=>{
            this._chat.getSingleUser(this.id).subscribe((data)=>{
              this.user=JSON.parse(JSON.stringify(data))
              this.usermail=sessionStorage.getItem('email')
              this.room=(this.createRoomName(this.user.email, this.usermail));
              this._chat.chatHistory(this.room)
              .subscribe((data)=>{
                this.messageArray=JSON.parse(JSON.stringify(data))
                // var elem = document.getElementById('commentbox');
                // elem.scrollTop = elem.scrollHeight;
              })
    
            })
          })
    
        }
        
    
      }

      sendMsg(){
        if(this.msg!==''){
          this._chat.sndprivatemsg(this.usermail,this.msg,this.id,this.room)
          this.msg=''
        }
      }

  refresh(){
    this.ngOnInit()
  }

  createRoomName(id1:any, id2:any) {
        // make sure id1 is the smaller value for
        // consistency of generation
        if (id1 > id2) {
            // swap two values
            let temp = id2;
            id2 = id1;
            id1 = temp;
        }
        return id1.toString(10).padStart(10, "0") + id2.toString(10).padStart(10, "0");
    }

    sendImage(){
      if(this.imageUrl!==''){
        this._chat.sndprvtimg(this.usermail,this.imageUrl,this.id,this.room)
        console.log(this.imageUrl);
        
        this.imagemodel='';
        this.imageUrl=''
      }
    }

    imageUrl:any='';
    imagefile:any;
    image:string=''
    onFileSelected(event:any){
  if(event.target.files){
  
    var reader=new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event:any)=>{
    this.imageUrl=reader.result;
    }
    this.imagefile=<File>event.target.files[0];
    } 
    this.image=this.imagefile.name;
  }

  userSelected(){
    return !!sessionStorage.getItem('chatUser')
  }

}





