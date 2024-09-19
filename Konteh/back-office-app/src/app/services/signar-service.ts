import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:7221/examHub', {
            // skipNegotiation: true
            // transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.startConnection();
    this.registerOnServerEvents();
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection established'))
      .catch(err => console.error('SignalR connection error:', err));
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('ReceiveExamRequest', (message: string) => {
       console.log("message:", message)
    });
  }
}
