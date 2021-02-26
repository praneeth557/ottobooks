import { Component, OnInit } from '@angular/core';
import { IProduct, ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<IProduct> = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((res: Array<IProduct>) => {
      this.products = res;
    });
  }

}
