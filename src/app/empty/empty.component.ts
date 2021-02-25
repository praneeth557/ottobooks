import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntegrationService } from '../integration/integration.service';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private integrationService: IntegrationService) { }

  ngOnInit(): void {
    const reqParams = window.location.href // this.route.snapshot.queryParams;
    this.integrationService.setShopifyData(reqParams).subscribe(res => {
      console.log(res);
      self.close();
    }, e => {
      console.log(e);
    });
  }

}
