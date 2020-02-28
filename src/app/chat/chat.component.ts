import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  WS_URL: String = 'wss://0l90clyplf.execute-api.us-east-2.amazonaws.com/test'
  messages: any[]
  chat_text: String
  logincred: any;
  messageFromServer: String;
  wsSubscription: Subscription;
  status: any;

  constructor(private wsService: WebsocketService) { 
    // this.wsSubscription = this.wsService.createObservableSocket("wss://0l90clyplf.execute-api.us-east-2.amazonaws.com/test").subscribe(
    //   data =>{
    //     this.messageFromServer = data
    //   },
    //   err =>{
    //     console.log('err', err);
    //   }
    // )
    
  }

  ngOnInit(): void {
    // this.websocketConnection.onopen = (event) => { 
    //   const context = { action: 'getRecentMessages' }
    //   this.websocketConnection.send(JSON.stringify(context))
    //   this.websocketConnection.onmessage = (event) =>{
    //     let data = JSON.parse(event.data)
    //     console.log("message things"+ data)
    //     if (data['messages']!== undefined){
    //       data['messages'].forEach((message) => {
    //         console.log("new ="+message)
    //         this.messages.push(message)
    //       })
    //     }
    //   }
    // }
  }


  getUsername() {
    this.logincred = JSON.parse(localStorage.getItem('Authobj'));
    return this.logincred.name
  }
  getCurrentTime(){
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
  }
  sendMessage(chat_text) { 
    if(chat_text !== '' ){
      const context = { 
      "action": "sendMessage", 
      "username": this.getUsername(), 
      "message": this.chat_text, 
      "timestamp": this.getCurrentTime() }
      const cc = JSON.stringify(context);
      // this.status = this.wsService.sendMessage(cc);
      this.chat_text =''
    }

  }

  closeSocket(){
    this.wsSubscription.unsubscribe();
    this.status ='The socket is closed';
  }

  ngOnDestroy(){
    this.closeSocket();
  }
}
