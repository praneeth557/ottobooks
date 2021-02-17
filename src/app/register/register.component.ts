import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
  }

  submitted = false;
  error = null;

  onSubmit(form: NgForm) {
    let reqSignup = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email,
      company: form.value.company,
      password: form.value.password
    }
    this.authorizationService.createUser(reqSignup).subscribe((responseData: any) => {
      if(responseData && responseData.success) {
        form.reset();
        this.router.navigate(['/login']);
      }
    }, (error) => {
      this.error == error;
    });
  }

}
