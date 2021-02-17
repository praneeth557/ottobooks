import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { QuestionnaireService, IDomain, IDomainReq } from '../questionnaire/questionnaire.service';
import { AuthorizationService } from '../authorization.service';
import { User } from '../user';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {

  selectedTab: FormControl = new FormControl(0);
  isEditMode: boolean = true;
  userData: User = new User();
  domain: IDomain = {domain_name: "", domain_id: ""};
  domainList: Array<IDomain> = [];

  constructor(private questionnaireService: QuestionnaireService, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.authorizationService.user.subscribe(user => {
      if(user) this.userData = user;
      if(user && user.domain) {
        this.getDomain('', user.domain); 
      } else {
        this.getDomain('');
      }
    });
  }

  getDomain(searchStr: string, domainId?: string) {
    this.questionnaireService.getDomains(searchStr).subscribe((domains: any) => {
      this.domainList = domains;
      if(domainId) {
        let selectedDomain = this.domainList.filter(d => d.domain_id == domainId);
        if(selectedDomain && selectedDomain.length) {
          this.domain = selectedDomain[0];
          this.isEditMode = false;
        }
      }
    });
  }

  savedomain() {
    const reqObj: IDomainReq = {
      domain: this.domain.domain_id,
    }
    this.questionnaireService.saveDomainAndSubdomain(reqObj)
      .subscribe(res => {
        this.userData.domain = reqObj.domain;
        this.authorizationService.updateUserData(this.userData);
        this.selectedTab.setValue(1);
        this.isEditMode = false;
    });
  }

  displayFn(domain: IDomain): string {
    return domain && domain.domain_name ? domain.domain_name : '';
  }

}
