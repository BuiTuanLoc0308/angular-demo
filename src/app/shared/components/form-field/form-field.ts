import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input({ required: true }) control!: FormControl;
}
