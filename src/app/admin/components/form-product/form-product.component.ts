import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from './../../../utils/validators';

import { ProductsService } from './../../../core/services/products/products.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  saveProduct(event: Event): void{
    event.preventDefault();
    if (this.form.valid){
      const product = this.form.value;
      this.productsService.createProduct(product)
      .subscribe( newproduct => {
          this.router.navigate(['./admin/products']);
      });
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group(
      {
        id: ['', [Validators.required]],
        title: ['', [Validators.required]],
        price:  ['', [Validators.required, MyValidators.isPriceValid]],
        image: '',
        description:  ['', [Validators.required]]
      }
    );
  }

  get priceField(): any{
    return this.form.get('price');
  }
  get hasErrorPriceInvalid(): boolean {
    return this.priceField.hasError('price_invalid');
  }

  uploadFile(event): void{
    const file = event.target.files[0];
    const dir = 'images';
    const fileRef = this.storage.ref(dir);
    const taks = this.storage.upload(dir, file);
    // console.log(file);

    // Ver avanza de la subida
    taks.percentageChanges()
    .pipe(
      finalize(() => {
        // retorna la URL
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe( url => {
          console.log(url);
          this.form.get('image').setValue(url);
        });
      })
    )
    .subscribe(

    );

  }
}
