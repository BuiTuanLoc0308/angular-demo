import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/models/login-request.model';
import { SnackbarService } from '../../../../core/services/snack-bar.service';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth-login.html',
  styleUrl: './auth-login.scss',
})
export class AuthLogin {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);

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
        this.snackbar.success('Đăng nhập thành công');

        this.router.navigate(['/my-recipes']);
      },

      // loi
      error: (error) => {
        if (error.status === 401) {
          this.snackbar.error('Sai tài khoản hoặc mật khẩu');
        } else {
          this.snackbar.error('Đã có lỗi xãy ra');
        }
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
