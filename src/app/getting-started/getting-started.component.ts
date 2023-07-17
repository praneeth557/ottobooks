import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  QuestionnaireService,
  IDomain,
  IDomainReq,
} from '../questionnaire/questionnaire.service';
import { AuthorizationService } from '../authorization.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css'],
})
export class GettingStartedComponent implements OnInit {
  selectedTab: FormControl = new FormControl(0);
  isEditMode: boolean = true;
  userData: User = new User();
  domain: IDomain = { domain_name: '', domain_id: '' };
  domainList: Array<IDomain> = [];

  constructor(
    private questionnaireService: QuestionnaireService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.router.url === '/questionnaire/products') {
      this.selectedTab.setValue(1);
    }
    this.authorizationService.user.subscribe((user) => {
      if (user) this.userData = user;
    });
  }

  onSelectedTabHandler(event) {
    this.router.navigate(['/questionnaire/products']);
    this.selectedTab.setValue(event);
  }
}
