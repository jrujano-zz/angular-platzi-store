import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from './../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
      // this.product = this.productsService.getProduct(id);
    });
  }

  fetchProduct(id: string){
    this.productsService.getProduct(id)
    .subscribe(product => {
      this.product = product;
    });
  }

  createProduct(){

    const newProduct: Product =
      {
        id: '2302',
        image: 'assets/images/mug.png',
        title: 'JR-Mug',
        price: 85000,
        description: 'bla bla bla bla bla',
        // count: 1,
      };

    this.productsService.createProduct(newProduct)
    .subscribe((product) => {
      console.log(product);
    });
  }
  updateProduct(): void {
    const updateProduct: Partial<Product> = {
      id: '888',
      image: 'assets/images/mug.png',
      title: 'JR-Mug',
      price: 26000,
      description: 'JR BUUUUs'
    };
    this.productsService.updateProduct('888', updateProduct)
    .subscribe(product => {
      console.log(product);
    });

  }

  deleteProduct(): any{
    this.productsService.deleteProduct('2302')
    .subscribe(resp => {
      console.log(resp);
    });

  }

}