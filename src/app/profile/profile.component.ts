import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { ProfileService, IProfile, Profile } from './profile.service';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup = new FormGroup({
    'firstname': new FormControl(null),
    'lastname': new FormControl(null),
    'email': new FormControl(null),
    'company': new FormControl(null),
    'accountId': new FormControl(null)
  });

  constructor(
    private authorizationService: AuthorizationService,
    private profileService: ProfileService
  ) { }

  isEditMode = false;
  profile: User = new User();
  copyText: string = 'Copy';

  ngOnInit(): void {
    this.setProfile();
  }

  setProfile() {
    this.authorizationService.user.subscribe(user => {
      if(user) {
        this.profile = user;
        this.profileForm.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          company: user.company,
          accountId: user.companyId
        });
        this.profileForm.disable();
      }
    });
  }

  editProfile() {
    this.profileForm.enable();
    this.isEditMode = true;
  }

  saveProfile() {
    const profileData: IProfile = {
      firstname: this.profileForm.value.firstname,
      lastname: this.profileForm.value.lastname,
      email: this.profileForm.value.email,
      company: this.profileForm.value.company
    }
    this.profileService.updateProfile(profileData).subscribe(resData => {
      this.profile.firstname = this.profileForm.value.firstname;
      this.profile.lastname = this.profileForm.value.lastname;
      this.profile.email = this.profileForm.value.email;
      this.profile.company = this.profileForm.value.company;
      this.authorizationService.updateUserData(this.profile);
      this.isEditMode = false;
    });
  }

  cancelProfile() {
    this.setProfile();
    this.isEditMode = false;
  }

  copyAccountId(txt: string) {
    this.copyText = txt;
  }

}
