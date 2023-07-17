import { Component, OnInit } from '@angular/core';
import { IProduct, ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Array<IProduct> = [];
  productQuestionnaire: Array<any> = [];
  selectedProductId: string = '';

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((res: Array<IProduct>) => {
      this.products = res;
      if (this.products && this.products.length) {
        this.selectedProductId = this.products[0].product_id;
        this.selectedProductHandler(this.selectedProductId);
      }
      // this.products = res.map((product) => {
      //   product.product_image = JSON.parse(product.product_image)[0].src;
      //   return product;
      // });
    });
  }

  selectedProductHandler(productId: string) {
    this.selectedProductId = productId;
    this.productsService
      .getProductQuestionnaire({
        product_id: productId,
      })
      .subscribe((productQuestionnaire: any) => {
        this.productQuestionnaire = productQuestionnaire;
        console.log(this.productQuestionnaire);
      });
  }
}
