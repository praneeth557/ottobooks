import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { animate, animation, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            animate(200, keyframes(
              [
               style({ height:0, opacity: 0 }),
               style({ height: "fit-content", opacity: 1 })
              ])
            )
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: "fit-content", opacity: 1 }),
            animate(200, keyframes(
              [
               style({ height: "fit-content", opacity: 1 }),
               style({ height: 0, opacity: 0 })
              ])
            )
          ]
        )
      ]
    )
  ]
})
export class MainComponent implements OnInit {

  isNavExpanded: boolean = false;
  isGettingStartedToggle: boolean = true;

  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
    if(this.router.url === '/') {
      this.router.navigate(['/getting-started/domain']);
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
