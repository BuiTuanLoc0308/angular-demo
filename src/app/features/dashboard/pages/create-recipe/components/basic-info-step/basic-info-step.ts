import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeCreateStateService } from '../../../../../../core/services/recipe-create-state.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-basic-info-step',
  imports: [FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './basic-info-step.html',
  styleUrl: './basic-info-step.scss',
})
export class BasicInfoStep {
  private recipeState = inject(RecipeCreateStateService);

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      recipeName: ['', Validators.required],

      description: ['', Validators.required],
    });
  }

  get recipeName() {
    return this.form.get('recipeName');
  }

  get description() {
    return this.form.get('description');
  }

  get recipeNameInvalid(): boolean {
    return !!(this.recipeName?.invalid && this.recipeName?.touched);
  }

  get descriptionInvalid(): boolean {
    return !!(this.description?.invalid && this.description?.touched);
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      this.recipeState.updateRecipe(value);

      console.log('Form Value:', value);
      console.log('Recipe State:', this.recipeState.recipe);
    });
  }
}
