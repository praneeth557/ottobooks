import { Component, OnInit } from '@angular/core';
import { SessionsService } from './sessions.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  conversations: Array<object> = [];

  constructor(private sessionsService: SessionsService) { }

  ngOnInit(): void {
    this.sessionsService.getConversations().subscribe((conversations: any) => {
      this.conversations = conversations;
    });
    //this.conversations = this.sessionsService.getConversations()
  }

}
