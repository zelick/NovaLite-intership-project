import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signar-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'back-office-app';
  
  constructor(private signalRService: SignalRService){}

  ngOnInit(): void {

  }
}
