import { Component, OnInit } from '@angular/core';
import { IConfig, ConfigureService } from './configure.service';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  config!: IConfig;
  jsScript: string = "http://voicefrontbot.herokuapp.com/main.js";
  cssScript: string = "http://voicefrontbot.herokuapp.com/main.js";

  primaryColor: string = "primary";
  isChatOpen: boolean = true;

  constructor(private configService: ConfigureService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.config = this.configService.getConfig();
    this.authorizationService.user.subscribe(user => {
      if(user && user.companyId) {
        this.config.accountId = user.companyId;
      }
      if(user && user.company) {
        let title = this.config.title;
        title += " to " + user.company;
        this.config.title = title;
      }
    })
  }

}
