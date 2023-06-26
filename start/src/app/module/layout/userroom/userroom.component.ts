import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WebsocketserviceService } from 'src/app/websocketservice.service';
import { DialogData } from '../dashboard/dashboard.component';
import { UsernamedialogComponent } from '../usernamedialog/usernamedialog.component';

@Component({
  selector: 'app-userroom',
  templateUrl: './userroom.component.html',
  styleUrls: ['./userroom.component.scss']
})
export class UserroomComponent implements OnInit {
  chatRoomForm: FormGroup = new FormGroup({});
  userRoomName:any;
   roomname=""
  constructor(private websocketservice :WebsocketserviceService,private route:Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsernamedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
   ) { }
  // @ViewChild('input')
  // input!:ElementRef
  ngOnInit(): void {
    this.createForm();
  }
  // sendname(value:any){
  //   console.log(value.value);
    
  //   console.log(this.roomname , "room2111");
  //   this.websocketservice.emit('joinrooms',value.value)
  //   this.route.navigate(["/dashboard"])
  // }
  createForm() {
    this.chatRoomForm = this.formBuilder.group({
      roomName: ['', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    });
  }

  onSubmitroom(){
    console.log("hiiiiiiiiiii");
    if (this.chatRoomForm.valid) {
      let data={ 
        userName:this.websocketservice.getuserdetails.username,
        userid:this.websocketservice.getuserdetails.newUserId,
        roomName:this.chatRoomForm.controls?.['roomName'].value
      }
      // console.log(data,"nandiiii!!",this.websocketservice.getUserDetails);

      this.websocketservice.joinRoom(data);
      this.dialogRef.close(data);
    }
  }

}
