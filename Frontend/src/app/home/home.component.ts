import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authservice:AuthService,private router:Router) { }

  regForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]),
    password: new FormControl('',[Validators.required,Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')])
  });

   

  get email(){ 
    return this.regForm.get('email');
  }

  get password(){ 
    return this.regForm.get('password');
  }
  
  user={
    email:'',
    password:''
  }
  ngOnInit(): void {

  }

  registerStudent(){
    
    console.log("called");
    this.authservice.userSignup(this.regForm.value)
    .subscribe(
      data=>{
        alert("register successfully");        
        this.ngOnInit;
      },
      err=>{
        alert(err.error)
        
    })

  }

  login(){
    console.log(this.user);
    sessionStorage.setItem("loginmail",this.user.email.toString())
    
    this.authservice.userlogin(this.user)
    .subscribe(
      data=>{
        console.log(data);
        sessionStorage.setItem('user',"logined")
        sessionStorage.setItem('email',data.email)
        alert("login success");

      },
      err=>{        
        alert(err.error);
      }
    )
    

  }

}