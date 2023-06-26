import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketserviceService } from 'src/app/websocketservice.service';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UsernamedialogComponent } from '../usernamedialog/usernamedialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserroomComponent } from '../userroom/userroom.component';

export interface DialogData {
  username: string;
  userroom: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'start';
  username: string = "";
  message: string = "";
  output: any[] = [];
  feedback: string = "";
  usernameenter: any[] = [];
  dis = "Disconnect the user"
  mess = ""
  disconnetedcondition = false;
  user: any;
  messagestyle = false;
  checkuser: any
  name: any[] = [];
  onlineUser = []
  joinroom = ""; today = new Date();
  todaysDataTime = '';
  userroom = "";
  socket: any;
  list: any;
  userDetails: any
  chatData: any;
  onetooneMessage: any = {}
  messageArray: Array<any> = [];
  messageForm!: FormGroup;
  roomMessage: any = {};
  contactList:Array<any>=[];
  online = []
  useryour: any
  clickname: any
  readMore = false;
  roomnameArray = <any>[]
  roomExist:any=false
  leavegroup=false
  presentgroup:Array<any>=[]


  constructor(private webSocketService: WebsocketserviceService, private route: Router, public dialog: MatDialog, private formBuilder: FormBuilder) {
    // this.openDialog();
  }
  ngOnInit(): void {
    this.createForm()
    this.groupList();
    this.socket = this.webSocketService.getSocket()
    this.webSocketService.listen('typing').subscribe((data: any) => this.updateFeedback(data));
    this.webSocketService.listen('chat').subscribe((data: any) => this.updateMessage(data));
    this.webSocketService.listen('disconnect').subscribe((data: any) => this.disconnectuser(data));
    // this.webSocketService.listen('group').subscribe((data: any) => this.groupuser(data));
    
    // this.webSocketService.emit('join-room','room1')
    this.updateduserlist()
      ;
    // this.socket.on("group-name",(groupName:any)=>{
    //   console.log("this is group name.....",groupName);
      
    //   this.contactList.push(groupName)
      
    // })



  }
  createForm() {
    this.messageForm = this.formBuilder.group({
      message: [''],
    });
  }
  groupList(){
    this.webSocketService.listen('group').subscribe(data=>{
      console.log(data,"group!!!!!!!!!!!!!!!!");
      this.presentgroup.push(data)
    })
  }

  updateduserlist() {
    this.webSocketService.emit('userlist', this.webSocketService.getuserdetails.username)
    this.socket.on('listlist', (userData: any) => {
      console.log('this is userdata', userData);
      console.log(this.socket.id, 'oncurrent user');
      this.onlineUser = userData.filter((data: any) => {
        return this.socket.id != data.socketid;
      });
      console.log(this.onlineUser, 'cjchasjahcnj');
      this.userDetails = this.onlineUser;
      console.log("this", this.userDetails);

      this.online = userData.filter((data: any) => {
        return this.socket.id == data.socketid;
      });
      console.log(this.online, "this.online");

      this.useryour = this.online;

    });
  }


  messageTyping(): void {
    this.username = this.webSocketService.getuserdetails.username
    this.webSocketService.emit('typing', this.username);
  }

  sendMessage(): void {
    const message = this.messageForm.controls?.['message'].value;
    let data = {
      message: message,
      userName: this.webSocketService.getuserdetails.username,
      roomName: this.chatData.roomName,
      userId: this.webSocketService.getuserdetails.newUserId,
      Idsocket: this.chatData.socketid,
      time: this.dateformating()
    };
    this.webSocketService.emit('chat', (data));
    if (!data.roomName) {
      this.onetooneMessage[this.chatData.name].push(data);
    }
    this.messageForm.reset();

  }
  onlineUserArray: any = []
  updateMessage(data: any) {
    if (data.roomName) {
      this.roomMessage[data.roomName].push(data);
    }
    else if (data.Idsocket) {
      console.log(data.Idsocket,"=========");
      
      this.onetooneMessage[data.userName].push(data);
    }
    console.log(data, 'juju')
  }
  // updateMessage(data: any) {
  //   console.log("hiiiiiiiiiiii");

  //   this.feedback = '';
  //   if (!!!data) return;

  //   this.output.push(data);
  //   console.log(this.output, "output");

  //   function getUniqueListBy(output: any, key: any) {
  //     return [...new Map(output.map((item: any) => [item[key], item])).values()]
  //   }
  // this.onlineUser = localStorage.getItem("members")
  // this.onlineUserArray=JSON.parse(this.onlineUser)



  // this.name = (getUniqueListBy(this.output, 'handle'))
  // this.onlineUserArray.push(this.name)
  // localStorage.setItem("members",JSON.stringify(this.onlineUserArray))

  // this.onlineUser = localStorage.getItem("members")
  // this.onlineUser=JSON.parse(this.onlineUser)
  // console.log("online member",this.onlineUser);



  //  this.userlistnames.push(this.name.handle)
  // for (let index = 0; index < usernamelist.length; index++) {
  // console.log(this.output[index].handle);

  // if(this.name[index]=usernamelist[index]){
  //   this.name.push(usernamelist[index])
  // }
  //   // this.dateformating();
  // }
  // console.log(this.name, "names");
  //  this.name.push(JSON.stringify(usernamelist))


  // let arr = [] ;
  // for (let index = 0; index < this.output.length; index++) {
  //   arr.push(this.output[index].handle)
  // }
  // console.log(arr,"arrr");



  // this.name  =  arr.filter(this.checkName)

  // localStorage.setItem('userid', JSON.stringify(this.output));
  // this.checkuser = localStorage.getItem("userid")




  userChecker(messageData: any) { // checks whether the user is owner or not
    console.log(messageData, "this is msg sender user id.....");

    // console.log(this.webSocketService.getUserID(),"this is current user socket id");

    let socket = this.webSocketService.getSocket()
    if (socket.id == messageData.Idsocket) {
      return true
    } else {
      return false;
    }
  }

  updateFeedback(data: any) {
    this.feedback = `${data} is typing a message`;
  }
  discon() {
    this.disconnetedcondition = true;
    this.webSocketService.emit('disconnect', this.dis);
  }

  disconnectuser(data: any) {
    this.mess = data
  }
  usernameTyping() {
    this.disconnetedcondition = false
  }
  logout() {
    this.route.navigate(['/account'])
  }

  dateformating() {
    this.today = new Date();
    return formatDate(this.today, 'hh:mm a', 'en-US', '+0530');
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserroomComponent);
    dialogRef.afterClosed().subscribe(res => {
      this.roomExist=false
      console.log(res, 'resuuu');
      for (let i = 0; i <this.contactList.length; i++) {
       // console.log(this.contactList[index].roomName),'----------';
        
        if(this.contactList[i].roomName==res.roomName){
          console.log(this.contactList[i].roomName,'000000000000');
              // alert(
              //   "This Group already exist"
              // )
              this.roomExist=true;
        }
        
      }
      if(this.roomExist==true){
        alert("this Group already exist")
      }
      else{
        console.log('hello group list');
        this.roomMessage[res.roomName] = [];
        this.contactList.push(res);
      } 
      // if(this.contactList.)
    //   if( localStorage.getItem("roomname")!=null){
    //     this.roomnameArray =JSON.parse(<any> localStorage.getItem("roomname"));
    //   }
    //   for (let index = 0; index < this.roomnameArray.length; index++) {
    //     console.log("loop working....");

    //         if(res.roomName==this.roomnameArray[index].roomName){
    //           this.roomExist=true;
    //         }
    // }
    // if(this.roomExist==true){
    //   alert("This Group already exist")
    // }else{
      // this.roomnameArray.push(res);
      // localStorage.setItem('roomname',JSON.stringify(this.roomnameArray))
      // this.roomMessage[res.roomName] = [];
      // this.contactList.push(res);
    // }

    })

  }
  
  onSelectName(data: any) {
    this.leavegroup=false
    console.log("data...............", data);
    this.chatData = data;
    console.log(this.chatData, " this.chatData ");
    this.clickname = this.chatData.name
    if (!this.onetooneMessage[data.name]) {
      this.onetooneMessage[data.name] = [];
    }
    this.messageArray = this.onetooneMessage[data.name]
    console.log(this.messageArray, 'suhu');
    console.log(this.chatData, "usd");
  }
  onSelect(data: any) {
    this.leavegroup=true;
    this.chatData = data;
    // this.contactList.push(data)
    console.log(this.chatData, 'jdsfjafi');
    this.messageArray = this.roomMessage[data.roomName]
    this.clickname = this.chatData.roomName
  }


}
