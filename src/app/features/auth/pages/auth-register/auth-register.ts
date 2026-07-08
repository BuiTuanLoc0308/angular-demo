import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../../../core/models/register-request.model';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../../../core/services/snack-bar.service';

@Component({
  selector: 'app-auth-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './auth-register.html',
  styleUrl: './auth-register.scss',
})
export class AuthRegister {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);

  message = '';

  isLoading = false;

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.fb.group(
      {
        userName: ['', Validators.required],

        password: ['', Validators.required],

        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;

    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get userNameInvalid(): boolean {
    return !!(this.userName?.invalid && this.userName?.touched);
  }

  get passwordInvalid(): boolean {
    return !!(this.password?.invalid && this.password?.touched);
  }

  get confirmPasswordInvalid() {
    return !!(this.confirmPassword?.invalid && this.confirmPassword?.touched);
  }

  get passwordMismatch() {
    return !!(this.registerForm.hasError('passwordMismatch') && this.confirmPassword?.touched);
  }

  onRegister() {
    this.isLoading = true;

    const registerData: RegisterRequest = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: () => {
        this.snackbar.success('Đăng ký thành công tài khoản mới');

        this.router.navigate(['/login']);
      },

      error: (error) => {
        this.isLoading = false;

        if (error.status === 409) {
          this.snackbar.error('Tài khoản đã tồn tại');
        } else {
          this.snackbar.error('Có lỗi xảy ra');
        }
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
