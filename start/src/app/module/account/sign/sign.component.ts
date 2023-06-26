import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketserviceService } from 'src/app/websocketservice.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  signupForm!: FormGroup
  signformarray:any[]=[]
  userDetailsArray:any[]=[]
  hide1=true;
  userExist:any=false
  data=[];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private websocketservice:WebsocketserviceService
  ) { }

  ngOnInit(): void {
    this.createForm();
    
  }

  createForm() {
    this.signupForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      country_code: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],

    })
  }
    link(){
      this.userExist=false;
      // if(this.signupForm.valid){
        if( localStorage.getItem("signform")!=null){
          this.userDetailsArray =JSON.parse(<any> localStorage.getItem("signform"));
        }
         for (let index = 0; index < this.userDetailsArray.length; index++) {
          console.log("loop working....");

              if(this.signupForm?.controls?.['email'].value==this.userDetailsArray[index].email){
                   this.userExist=true
                   console.log("loop userexixt value....", this.userExist);

              }
      }

      if(this.userExist==true){
        alert("user already exist")
      }else{
        this.userDetailsArray.push((this.signupForm.value))
        localStorage.setItem('signform',JSON.stringify(this.userDetailsArray))
        this.router.navigate(["/dashboard"])
      }
       this.websocketservice.setuserdetails(this.signupForm.value)
       console.log("signup form ...",this.signupForm.value);
      

    }
    back(){
      console.log('hiiiiiiiiii');
      this.router.navigate(['/account'])
    }

}



