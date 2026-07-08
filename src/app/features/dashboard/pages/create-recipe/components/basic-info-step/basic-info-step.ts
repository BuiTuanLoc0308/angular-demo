import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeCreateStateService } from '../../../../../../core/services/recipe-create-state.service';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-basic-info-step',
  imports: [FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './basic-info-step.html',
  styleUrl: './basic-info-step.scss',
})
export class BasicInfoStep implements OnInit {
  private recipeState = inject(RecipeCreateStateService);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);

  form: FormGroup;

  constructor() {
    const recipe = this.recipeState.getRecipe();

    this.form = this.fb.group({
      recipeName: [recipe.recipeName, Validators.required],

      description: [recipe.description, Validators.required],
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
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.recipeState.updateRecipe(value);
    });
  }
}
