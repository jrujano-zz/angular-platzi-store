import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './../../../core/models/product.model';
import { CartService } from './../../../core/services/cart/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {

  products$: Observable<Product[]>;
  cardValid: Observable<boolean>;
  constructor(
    private cartService: CartService
  ) {
    this.products$ = this.cartService.carts$;
    this.cardValid = this.cartEmpty();
  }

  ngOnInit(): void {
  }

  cartEmpty(): Observable<boolean> {
    return this.products$.pipe(
      map((products) => {
        if (products.length === 0) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
  addProductCart(product: Product): any {
    this.cartService.addProduct(product);
  }

  deleteProductCart(product: Product): any {
    this.cartService.deleteProduct(product);
  }

}
