import { Component } from '@angular/core';
import { WebsocketserviceService } from './websocketservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'start';
  // img:any;
  // userName: string="";
  // message: string="";
  // output: any[] = [];
  // feedback: string="";
  // usernameenter:any[]=[];
  // dis="disconnect the user"
  // mess=""
  // disconnetedcondition=false;
  // user:any;
  // messagestyle=false;
  // checkuser:any

  constructor(private webSocketService: WebsocketserviceService) { }
  ngOnInit(): void {
    
    // this.webSocketService.listen('typing').subscribe((data:any) => this.updateFeedback(data));
    // this.webSocketService.listen('chat').subscribe((data:any) => this.updateMessage(data));
    // this.webSocketService.listen('disconnect').subscribe((data:any) => this.disconnectuser(data));
  }

  // messageTyping(): void {
  //   console.log('typing',this.userName);
    
  //   this.webSocketService.emit('typing', this.userName);    
  // }

  // sendMessage(): void {
  //   console.log(this.message);
  //  this.webSocketService.emit('chat', {
  //     images:this.img,
  //     message: this.message,
  //     handle: this.userName
  //   })
  //   this.message = "";    
  //   console.log(this.message);
  
  // }

  // updateMessage(data:any) {
  //   this.feedback = '';
  //   if(!!!data) return;
  //   console.log(`${data.handle} : ${data.message}`);
  //   this.output.push(data);
  //   localStorage.setItem('userid',JSON.stringify(this.output));
  //   this.checkuser=localStorage.getItem("userid")

  //   this.user={docId : data.docketId , userName : data.handle}
  //   if(this.user.userName==this.checkuser.handle && this.user.docId==this.checkuser.docketId){
  //     this.messagestyle=true;
  //   }
  //   // if()
  //   // {}
  //   // this.usernameenter.push(data.handle)
   
  // }

  // updateFeedback(data: any){
  //   this.feedback = `${data} is typing a message`;
  // }
  // discon(){
  //   this.disconnetedcondition=true;
  //   this.webSocketService.emit('disconnect', this.dis);
  // }
  
  // disconnectuser(data:any){
  //   this.mess=data
  // }
  // usernameTyping(){
  //   this.disconnetedcondition=false
  // }

}