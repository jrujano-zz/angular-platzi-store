import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }


  private buildForm(): any {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  login(event: Event): any{
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.signIn(value.email, value.password)
      .then((resp) => {
        console.log(resp);
        this.router.navigate(['/admin/']);
      }).catch((error) => {
        window.alert(error.message);
      });
    }

  }

}
