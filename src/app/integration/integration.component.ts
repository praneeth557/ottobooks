import { Component, OnInit } from '@angular/core';
import { IntegrationService } from './integration.service';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit {

  shopifyStore: string;

  constructor(private integrationService: IntegrationService) { }

  ngOnInit(): void {
  }

  shopifyIntegrate() {
    if(this.shopifyStore && this.shopifyStore != '') {
      this.integrationService.integrateShopify(this.shopifyStore).subscribe((res: any) => {
        if(res && res.auth_url) {
          let width = 600;
          let height = 700;
          let left = (screen.width/2)-(width/2);
          let top = (screen.height/2)-(height/2);
          let size = "toolbar,scrollbars,resizable,left=" + left + ",top=" + top + ",width=" + width + ",height=" + height;
          let win = window.open(res.auth_url,"_blank", size);
        }
      });
    }
  }

}
