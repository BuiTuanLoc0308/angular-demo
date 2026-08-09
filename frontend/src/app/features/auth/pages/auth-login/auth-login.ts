import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/models/login-request.model';
import { SnackbarService } from '../../../../core/services/snack-bar.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormField } from '../../components/form-field/form-field';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe, FormField],
  templateUrl: './auth-login.html',
  styleUrl: './auth-login.scss',
})
export class AuthLogin {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  private translate = inject(TranslateService);

  message = '';

  isLoading = false;

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],

      password: ['', Validators.required],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get usernameInvalid(): boolean {
    return !!(this.username?.invalid && this.username?.touched);
  }

  get passwordInvalid(): boolean {
    return !!(this.password?.invalid && this.password?.touched);
  }

  get usernameControl() {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }

  onLogin() {
    this.isLoading = true;

    // lay data
    const loginData: LoginRequest = this.loginForm.value;

    // goi api
    this.authService.login(loginData).subscribe({
      // thanh cong
      next: () => {
        this.snackbar.success(this.translate.instant('SUCCESS.LOGIN'));

        this.router.navigate(['/my-recipes']);
      },

      // loi
      error: (error) => {
        this.isLoading = false;

        if (error.status === 400) {
          this.snackbar.error(this.translate.instant('FAILED.LOGIN'));
        } else {
          this.snackbar.error(this.translate.instant('ERRORS.GENERIC'));
        }
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
