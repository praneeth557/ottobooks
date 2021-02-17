import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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
