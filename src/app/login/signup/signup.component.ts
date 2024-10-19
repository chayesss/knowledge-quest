import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMsg: string = '';
  isError: boolean = false

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', [Validators.required, Validators.minLength(6)]],
      confirmPasswordCtrl: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {
    if (this.signupForm.valid) {
      if (this.signupForm.value.passwordCtrl !== this.signupForm.value.confirmPasswordCtrl) {
        this.errorMsg = 'Passwords do not match'
        this.isError = true;
      } else {
        this.authService.signUp(this.signupForm.value.emailCtrl, this.signupForm.value.passwordCtrl).subscribe({
          next: data => {
            console.log('signup success')
          },
          error: e => {
            this.errorMsg = 'Sign up failed'
            this.isError = true;
          },
        })
      }
    }
  }


  matchPasswordValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(this.signupForm.value.passwordCtrl === this.signupForm.value.confirmPasswordCtrl ? null : { passwordMismatch: true })
    }
  }

}
