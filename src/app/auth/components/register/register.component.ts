import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../../core/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';



export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const confirmPassword = control.parent.get('confirmpassword');

  if (!password || !confirmPassword) {
    return null;
  }

  if (confirmPassword.value === '') {
    return null;
  }

  if (password.value === confirmPassword.value) {
    return null;
  }

  return {passwordsNotMatching: true};
};


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  authenticationError = false;

  @Input() passwordErrorMatchText = 'Password must match'; 

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  register(event: Event): any {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      console.log(value);
      this.authService.createUser(value.email, value.password)
      .then(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

  private buildForm(): any {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required, confirmPasswordValidator]],
    });
  }

  get color(): string {
    return this.authenticationError ? 'warn' : 'primary';
  }


}
