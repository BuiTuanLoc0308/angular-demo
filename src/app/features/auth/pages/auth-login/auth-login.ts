import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/models/login-request.model';
import { SnackbarService } from '../../../../core/services/snack-bar.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe],
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
      userName: ['', Validators.required],

      password: ['', Validators.required],
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get userNameInvalid(): boolean {
    return !!(this.userName?.invalid && this.userName?.touched);
  }

  get passwordInvalid(): boolean {
    return !!(this.password?.invalid && this.password?.touched);
  }

  onLogin() {
    this.isLoading = true;

    // lay data
    const loginData: LoginRequest = this.loginForm.value;

    // goi api
    this.authService.login(loginData).subscribe({
      // thanh cong
      next: () => {
        this.snackbar.success(this.translate.instant('LOGIN.LOGIN_SUCCESS'));

        this.router.navigate(['/my-recipes']);
      },

      // loi
      error: (error) => {
        if (error.status === 401) {
          this.snackbar.error(this.translate.instant('LOGIN.LOGIN_FAILED'));
        } else {
          this.snackbar.error(this.translate.instant('SNACKBAR.GENERIC_ERROR'));
        }
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
