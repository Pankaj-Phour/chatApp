import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }
  socket:any;


  SocketConnection(){
    this.socket = io(environment.URL);
    this.socket['userId'] = JSON.parse(localStorage.getItem('user'))._id;
    console.log(this.socket);
    
    // this.socket.emit('message',"Message from frontend")

    this.socket.on('messsage',(msg:any)=>{
      console.log("Received message",msg);
      
    })
  }

  disConnect(){
    this.socket.disConnect();
  }
}
