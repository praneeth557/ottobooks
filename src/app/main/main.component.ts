import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { animate, animation, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-main',
  animations: [
    trigger('expandCollapse', [
      state(
        'expand',
        style({
          opacity: 1
        })
      ),
      state(
        'collapse',
        style({
          width: '50px',
          opacity: 0
        })
      ),
      transition('expand => collapse', [animate('500ms linear')]),
      transition('collapse => expand', [animate('300ms linear')])
    ])
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isNavExpanded: boolean = false;

  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
    if(this.router.url === '/') {
      this.router.navigate(['/getting-started']);
    }
  }

  logout() {
    this.authorizationService.removeUser().subscribe((responseData: any) => {
      if(responseData && responseData.success) {
        this.authorizationService.loggedIn = false;
        this.router.navigate(['/login']);
      }
    });
  }

}
