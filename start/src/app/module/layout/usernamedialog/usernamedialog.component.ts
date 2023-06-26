import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-usernamedialog',
  templateUrl: './usernamedialog.component.html',
  styleUrls: ['./usernamedialog.component.scss']
})
export class UsernamedialogComponent implements OnInit {
  chatRoomForm: FormGroup = new FormGroup({});
  userRoomName:any;
  constructor(
    private formBuilder: FormBuilder,
    private _route: Router,
    // private socketService: SocketioService,
    public dialogRef: MatDialogRef<UsernamedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
