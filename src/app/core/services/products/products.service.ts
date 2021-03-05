import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './../../models/product.model';
import { environment } from './../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }
  // tslint:disable-next-line: typedef
  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products/`);
  }
  // tslint:disable-next-line: typedef
  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }
  // tslint:disable-next-line: typedef
  createProduct(product: Product){
    console.log(product);
    return this.http.post(`${environment.url_api}/products`, product);
  }

  // tslint:disable-next-line: typedef
  updateProduct(id: string, changes: Partial<Product>){
    return this.http.put(`${environment.url_api}/products/${id}`, changes);

  }

  // tslint:disable-next-line: typedef
  deleteProduct(id: string){
    return this.http.delete(`${environment.url_api}/products/${id}`);
  }
}
