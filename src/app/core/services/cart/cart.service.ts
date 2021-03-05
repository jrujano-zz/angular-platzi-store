import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Product } from './../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  carts$ = this.cart.asObservable();
  productTmp: any;
  constructor() { }

  addProduct(product: Product): any{
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }

  deleteProduct(product: Product): any{
    this.productTmp = this.products.find(obj => obj.id === product.id);
    if (this.productTmp){
      this.products.splice(this.products.indexOf(this.productTmp), 1);
    }
    this.products = [...this.products];
    console.log( this.products);
    this.cart.next(this.products);
  }
}
