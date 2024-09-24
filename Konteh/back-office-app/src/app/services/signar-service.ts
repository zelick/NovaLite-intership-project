import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  startConnection(hubUrl: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl)
    .build();

    this.hubConnection
    .start()
    .catch(err => console.log('Error while starting connection' + err))
  }

  receiveExamRequest (){
    this.hubConnection.on('ReceiveExamRequest', (message) => {
      //TO DO:
    });
  }
}
