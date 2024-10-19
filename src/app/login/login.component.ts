import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg: string = '';
  isError: boolean = false

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value.emailCtrl, this.loginForm.value.passwordCtrl)
        .subscribe({
          next: data => {
            this.router.navigate(['dashboard'])
          },
          error: e => {
            this.errorMsg = 'Invalid Credentials!'
            this.isError = true
          }
        });

    }
  }


}
