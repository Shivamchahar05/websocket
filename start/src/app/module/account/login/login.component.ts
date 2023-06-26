import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WebsocketserviceService } from 'src/app/websocketservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  checkdetails:any
  login!:FormGroup
  hide1=true;
  constructor(private formBuilder:FormBuilder ,private route:Router,private websocketservice:WebsocketserviceService , private _snackBar:MatSnackBar ) { }

  ngOnInit(): void {
    this. loginform();
  }
  loginform(){
    this.login = this.formBuilder.group({
      email: [null, [Validators.required,Validators.email,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      password: [null, [Validators.required,Validators.minLength(8), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      checkbox: [null, Validators.required]
    })
  }
  onSubmit(){
    console.log(this.login.value,"this.login.value");
    
    this.websocketservice.guardlogin=this.login.value
    this.checkdetails= JSON.parse(<any>localStorage.getItem("signform"))
    console.log(this.checkdetails);
    for(let i=0; i<this.checkdetails.length; i++){
      if(this.login.valid && (this.login.controls)! && (this.checkdetails[i].email==this.login.value.email) && (this.checkdetails[i].password==this.login.value.password)  ){
        this.route.navigate(['/dashboard'])
        console.log(this.login,'loginform');
        // localStorage.removeItem('signform')
        }
      //  this.websocketservice.guardlogin=this.login.value
    }
    this._snackBar.open("Welcome you are joined",'',{
      duration:2000,
      verticalPosition:"top",
      horizontalPosition:"center"
     })
  }
  get loginform1(){
    return this.login.controls
  }
  signuppage(){
    this.route.navigate(["./account/sign"])
  }

}
