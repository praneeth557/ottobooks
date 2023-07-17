import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { IQuestionnaire } from '../questionnaire/questionnaire.service';

export interface IProduct {
  company_id: string;
  product_id: string;
  product_title: string;
  product_sku: string;
  product_image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get(Constants.API_ENDPOINT + 'products');
  }

  getProductQuestionnaire(product_id: string) {
    return this.httpClient.get(
      `${Constants.API_ENDPOINT}product_answers?product_id=${product_id}`
    );
  }

  createProductQuestion(question: any) {
    return this.httpClient.post(
      `${Constants.API_ENDPOINT}product_answers`,
      question
    );
  }

  updateProductQuestion(question: any) {
    return this.httpClient.put(
      `${Constants.API_ENDPOINT}product_answers`,
      question
    );
  }
}
