import { Component, OnInit,ViewChild,ElementRef,AfterViewChecked } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-chathistory',
  templateUrl: './chathistory.component.html',
  styleUrls: ['./chathistory.component.css']
})

export class ChathistoryComponent implements OnInit ,AfterViewChecked {
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
  flag:any=''
  grpid:any=''
  group={
    name:'',
    members:[]
  };
  ingroup:any=''
  muteuser:any=[];

  ngOnInit(): void {

    this.flag=sessionStorage.getItem('chat')
    if(this.flag=="private"){
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
              this._chat.getBlockData().subscribe((data)=>{
                this.block=JSON.parse(JSON.stringify(data))
  
              })
            })
  
          })
        },500)
       
      }
    }else if(this.flag=="group"){
      this.grpid=sessionStorage.getItem('chatGroup')
      if(this.grpid){
        setInterval(()=>{
          this._chat.getSingleGroup(this.grpid).subscribe((data)=>{
            this.group=JSON.parse(JSON.stringify(data))
            this.usermail=sessionStorage.getItem('email')
            this.inGroup()
            var inside=sessionStorage.getItem('ingrp')
            // console.log(inside);
            

            
            if(this.ingroup=='yes'){
              this._chat.groupChatHistory(this.group.name)
              .subscribe((data)=>{
                this.messageArray=JSON.parse(JSON.stringify(data))
              })
            }
  
          })
        },500)

      }
      

    }
    this.scrollToBottom();
        
    
    }

    forwrdmessage:any=''
  sendMsg(){
    this.userIsBlocked()
    this.blockedUser()
    this.forwrdmessage=sessionStorage.getItem('forward message')
  if(this.forwrdmessage){
    this._chat.sndprivatemsg(this.usermail,this.forwrdmessage,this.id,this.room)
    this.imagemodel='';
    this.imageUrl=''
    sessionStorage.removeItem('forward img')
    sessionStorage.removeItem('forward message')

  }else if(this.userBlocked=='yes'){
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

  forwardMsg(item:any){
    if(item.imgfile){
      sessionStorage.setItem('forward img',item.imgfile.toString())
      alert("Please select the contact where you want to forward message")

    }else if(item.message){
      sessionStorage.setItem('forward message',item.message.toString())
      alert("Please select the contact where you want to forward message")


    }
  }

  muteArray:any=[]
    muteUser(email:any){
      this.muteArray.push(email)
      console.log(this.muteArray);
    }
    isuserMuted:any=''

    userMuted(){
      for(let i of this.muteArray){        
        if(i==this.user.email){
          this.isuserMuted="yes"
        }else{
          this.isuserMuted=''
        }
      }

    }

    checkMute(){
      this.userMuted()
      return !!this.isuserMuted
    }

    unmuteUser(user:any){
      const index = this.muteArray.indexOf(user);
      if (index > -1) {
      this.muteArray.splice(index, 1); // 2nd parameter means remove one item only
     }
     this.userMuted()
     console.log(this.isuserMuted);
     window.location.reload()
     
     
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

    forwrdImgurl:any=''
    sendImage(){
      this.userIsBlocked()
      this.blockedUser()
      this.forwrdImgurl=sessionStorage.getItem('forward img')
      if(this.forwrdImgurl){
        this._chat.sndprvtimg(this.usermail,this.forwrdImgurl,this.id,this.room)
        this.imagemodel='';
        this.imageUrl=''
        sessionStorage.removeItem('forward img')
        sessionStorage.removeItem('forward message')
    
      }else if(this.userBlocked=='yes'){
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
  groupSelected(){
    return !!sessionStorage.getItem('chatGroup')
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

  checkPrivate(){
    return sessionStorage.getItem('private')
}

checkGroup(){
  return sessionStorage.getItem('group')
}

inGroup(){    
  
  
        this.ingroup=''
        let members=this.group.members 
        for (let i of members){
          if(i==this.usermail){
            this.ingroup='yes'
            
          }
        }

}

checkinsideGroup(){
  this.inGroup()
  return !!this.ingroup
}

joinGroup(data:any){
  console.log(data);
  console.log(this.usermail);
  this._chat.joinGroup(this.usermail,data._id).subscribe(
    data=>{
      alert("joined to Group")
    }
  )
}

leaveGroup(group:any){
      console.log(this.usermail);
      this._chat.leftGroup(this.usermail,group._id).subscribe(
        data=>{
          alert("Left Group")
          window.location.reload()
        }
      )
    }

sendGroupImage(){
  this.forwrdImgurl=sessionStorage.getItem('forward img')
  if(this.forwrdImgurl){
    this._chat.sndgrpimg(this.usermail,this.forwrdImgurl,this.group.name)
    this.imagemodel='';
    this.imageUrl=''
    sessionStorage.removeItem('forward img')
    sessionStorage.removeItem('forward message')

  }else if(this.ingroup=='yes'){
    if(this.imageUrl!==''){
this._chat.sndgrpimg(this.usermail,this.imageUrl,this.group.name)
this.imagemodel='';
this.imageUrl=''

}
    }else {
    alert("you cant send msg to this group!! Please join to send message")
  }
}



sendGroupMsg(){
  this.forwrdmessage=sessionStorage.getItem('forward message')
if(this.forwrdmessage){
this._chat.sndgrpmsg(this.usermail,this.forwrdmessage,this.group.name)
this.imagemodel='';
this.imageUrl=''
sessionStorage.removeItem('forward img')
sessionStorage.removeItem('forward message')

}else if(this.ingroup=='yes'){
    if(this.msg!==''){
      this._chat.sndgrpmsg(this.usermail,this.msg,this.group.name)
      this.msg=''
    }
    }else {
    alert("you cant send msg to this group!! Please join to send message")
  }
}

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

}




