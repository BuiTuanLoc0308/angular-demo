import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeCreateStateService } from '../../../../../../core/services/recipes/recipe-create-state.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';

import { MatChipsModule } from '@angular/material/chips';
import { RecipesQueryService } from '../../../../../../core/services/recipes/recipes-query.service';

@Component({
  selector: 'app-basic-info-step',
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe, MatChipsModule],
  templateUrl: './basic-info-step.html',
  styleUrl: './basic-info-step.scss',
})
export class BasicInfoStep implements OnInit {
  private recipeState = inject(RecipeCreateStateService);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private queryService = inject(RecipesQueryService);

  readonly categories = this.queryService.categories.filter((c) => c !== 'ALL');

  form: FormGroup;

  constructor() {
    const recipe = this.recipeState.getRecipe();

    this.form = this.fb.group({
      recipeName: [recipe.recipeName, Validators.required],
      description: [recipe.description, Validators.required],
      categories: [recipe.categories ?? [], Validators.required],
    });
  }

  get recipeName() {
    return this.form.get('recipeName');
  }

  get description() {
    return this.form.get('description');
  }

  get categoriesControl() {
    return this.form.get('categories');
  }

  get recipeNameInvalid(): boolean {
    return !!(this.recipeName?.invalid && this.recipeName?.touched);
  }

  get descriptionInvalid(): boolean {
    return !!(this.description?.invalid && this.description?.touched);
  }

  get categoriesInvalid(): boolean {
    return !!(this.categoriesControl?.invalid && this.categoriesControl?.touched);
  }

  ngOnInit() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.recipeState.updateRecipe(value);
    });
  }
}
