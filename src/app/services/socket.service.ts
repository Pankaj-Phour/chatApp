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

    this.socket.emit('message',"Message from frontend")

    this.socket.on('response',(msg:any)=>{
      console.log("Message from backend",msg);
      
    })
  }

  disConnect(){
    this.socket.disConnect();
  }
}
