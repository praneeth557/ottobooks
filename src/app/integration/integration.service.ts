import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(private httpClient: HttpClient) { }

  integrateShopify(storeName: string) {
    return this.httpClient.post(
      Constants.API_ENDPOINT + '/shopify/register',
      {
        "storename": storeName
      }
    );
  }


  setShopifyData(url: any) {
    return this.httpClient.post(
      Constants.API_ENDPOINT + "shopify/redirect",
      {
        request_url: url
      }
    )
  }
}
