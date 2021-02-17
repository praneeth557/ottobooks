import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
  }

  user = new Subject<User>();
  error = null;

  submitted = false;

  onSubmit(form: NgForm) {
    const reqSignIn = {
      email: form.value.email,
      password: form.value.password
    }
    this.authorizationService.validateUser(reqSignIn).subscribe((responseData: any) => {
      if(responseData) {
        this.authorizationService.loggedIn = true;
        this.router.navigate(['/']);
      }
    }, (error) => {
      this.error = error.message;
    });
  }

}
