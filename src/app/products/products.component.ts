import { Component, OnInit } from '@angular/core';
import { IProduct, ProductsService } from './products.service';
import { IQuestionnaire } from '../questionnaire/questionnaire.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Array<IProduct> = [];
  productQuestionnaire: Array<any> = [];
  selectedProductId: string = '';
  searchproduct: string;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((res: Array<IProduct>) => {
      this.products = res;
      if (this.products && this.products.length) {
        this.selectedProductId = this.products[0].product_id;
        this.selectedProductHandler(this.selectedProductId);
      }
      this.products = res.map((product: any) => {
        if (product.product_image.length)
          product.product_image = product.product_image[0].src;
        return product;
      });
    });
  }

  selectedProductHandler(productId: string) {
    this.selectedProductId = productId;
    this.productsService
      .getProductQuestionnaire(productId)
      .subscribe((productQuestionnaire: any) => {
        this.productQuestionnaire = productQuestionnaire;
      });
  }

  createQuestionHandler(updatedQuestion: any) {
    const req = {
      product_id: updatedQuestion.productId,
      question: updatedQuestion.question,
      answer: updatedQuestion.answer,
    };
    this.productsService.createProductQuestion(req).subscribe((res) => {
      this.productsService
        .getProductQuestionnaire(updatedQuestion.productId)
        .subscribe((productQuestionnaire: any) => {
          this.productQuestionnaire = productQuestionnaire;
        });
    });
  }

  updateQuestionHandler(updatedQuestion: any) {
    this.productsService
      .updateProductQuestion(updatedQuestion)
      .subscribe((res) => {
        this.productsService
          .getProductQuestionnaire(updatedQuestion.productId)
          .subscribe((productQuestionnaire: any) => {
            this.productQuestionnaire = productQuestionnaire;
          });
      });
  }
}
