import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, MatIconModule],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input({ required: true }) control!: FormControl;

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
