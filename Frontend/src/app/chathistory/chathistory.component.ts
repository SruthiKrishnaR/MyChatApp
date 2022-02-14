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
  block:any=[]
  userBlocked=''
  isuserBlocked='';
  
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
                this._chat.getBlockData().subscribe((data)=>{
                  this.block=JSON.parse(JSON.stringify(data))
    
                })
                // var elem = document.getElementById('commentbox');
                // elem.scrollTop = elem.scrollHeight;
              })
    
            })
          })
    
        }
        
    
      }

      sendMsg(){
        this.userIsBlocked()
        this.blockedUser()
        if(this.userBlocked=='yes'){
          alert("you had blocked this user")
        } else if(this.isuserBlocked=='yes'){
          alert("you cant send msg to this user as you are blocked")
        }else if(this.msg!==''){
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
      this.userIsBlocked()
      this.blockedUser()
      if(this.userBlocked=='yes'){
        alert("you had blocked this user")
      } else if(this.isuserBlocked=='yes'){
        alert("you cant send msg to this user as you are blocked")
      }else if(this.imageUrl!==''){
        this._chat.sndprvtimg(this.usermail,this.imageUrl,this.id,this.room)
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

  blockUser(user_email:any){
    console.log(user_email);
    console.log(this.usermail);
    this._chat.blockUser(this.usermail,user_email)
    .subscribe((data)=>{
      alert("USER BLOCKED!!")
    })
    
    
  }

  unblockUser(user_email:any){
    this._chat.unblockUser(this.usermail,user_email)
    .subscribe((data)=>{
      alert("USER UNBLOCKED!!")
      window.location.reload()
      
    })
    
  }
  
  blockedUser(){
    for(let i of this.block){        
      if(i.from==this.usermail&&i.to==this.user.email){
        this.userBlocked="yes"
      }else{
        this.userBlocked=""
      }
    }
  }

  userIsBlocked(){
    for(let i of this.block){        
      if(i.to==this.usermail&&i.from==this.user.email){
        this.isuserBlocked="yes"
      }else{
        this.isuserBlocked=""
      }
    }
  }

  checkBlock(){
    this.blockedUser()
    return !!this.userBlocked
  }

}





