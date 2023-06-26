import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from "rxjs";
import { EmailValidator } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class WebsocketserviceService {
  socket:SocketIOClient.Socket;
  userID:any;
  signdetails:any
  guardlogin:any
  constructor() {
       this.socket=io.connect("http://localhost:4000");
   }

   name:any;
   getSocket() {
    return this.socket;
  }
   setuserdetails(data:any){
    this.signdetails={
        username:data.first_name,
        email:data.email,
        newUserId: this.generateUid(),
    }
    console.log(this.signdetails,'this.signdetails');
    
   }
   joinRoom(data: any) {
    console.log(data, 'hiiiii');
    this.socket.emit("join", data);
  }

   get getuserdetails(){
   return this.signdetails;
   }

   listen(eventname: string) : Observable<any> {
    console.log("this is incoming data of user ..");

    return new Observable((subscriber) => {
        this.socket.on(eventname, (data:any) => {
            subscriber.next(data);
            console.log("this is incoming data of user ..",data);
            
        })
    })
}

emit(eventname: string, data: any) {
    this.socket.emit(eventname, data);
}

generateUid() {
    const length = 5;
    const randomNo = Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
    return randomNo;
  }


  // ONGrouplist(eventname: string, data: any){
  //      this.socket.on(eventname,(data))
  // }
}



