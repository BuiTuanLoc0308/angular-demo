import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../../core/models/register-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-register',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './auth-register.html',
  styleUrl: './auth-register.scss',
})
export class AuthRegister {
  message = '';

  isLoading = false;

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],

      password: ['', Validators.required],
    });
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get userNameInvalid(): boolean {
    return !!(this.userName?.invalid && this.userName?.touched);
  }

  get passwordInvalid(): boolean {
    return !!(this.password?.invalid && this.password?.touched);
  }

  onRegister() {
    this.isLoading = true;

    const registerData: RegisterRequest = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },

      error: (error) => {
        this.isLoading = false;

        if (error.status === 409) {
          this.message = 'Email đã tồn tại';
        } else {
          this.message = 'Có lỗi xảy ra';
        }
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
