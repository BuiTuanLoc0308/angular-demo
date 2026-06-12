import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/models/login-request.model';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-login.html',
  styleUrl: './auth-login.scss',
})
export class AuthLogin {
  message = '';

  isLoading = false;

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
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
      next: (response) => {
        console.log(response);

        this.router.navigate(['/my-recipes']);
      },

      // loi
      error: (error) => {
        console.log(error);

        if (error.status === 401) {
          this.message = 'Sai tài khoản hoặc mật khẩu';
        } else {
          this.message = 'Có lỗi xảy ra';
        }
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
