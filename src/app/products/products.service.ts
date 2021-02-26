import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';

export interface IProduct {
  company_id: string,
  product_id: string,
  product_title: string,
  product_sku: string,
  product_image: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get(
      Constants.API_ENDPOINT + "products"
    );
  }
}
