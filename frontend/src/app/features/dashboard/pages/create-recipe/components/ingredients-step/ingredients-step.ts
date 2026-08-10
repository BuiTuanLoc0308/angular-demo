import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeCreateStateService } from '../../../../../../core/services/recipes/recipe-create-state.service';
import { IngredientModel } from '../../../../../../core/models/recipes/ingredient.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-ingredients-step',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './ingredients-step.html',
  styleUrl: './ingredients-step.scss',
})
export class IngredientsStep implements OnInit {
  private fb = inject(FormBuilder);
  private recipeState = inject(RecipeCreateStateService);
  private destroyRef = inject(DestroyRef);

  form = this.fb.group({
    ingredients: this.fb.array([]),
  });

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  createIngredient(ingredient?: IngredientModel): FormGroup {
    return this.fb.group({
      ingredientName: [ingredient?.ingredientName ?? '', Validators.required],
      quantity: [ingredient?.quantity ?? '', Validators.required],
      unit: [ingredient?.unit ?? 'GRAM', Validators.required],
    });
  }

  private initIngredients(): void {
    const recipe = this.recipeState.getRecipe();

    if (recipe.ingredients.length > 0) {
      recipe.ingredients.forEach((ingredient) => {
        this.ingredients.push(this.createIngredient(ingredient));
      });

      return;
    }

    this.ingredients.push(this.createIngredient());
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);

    if (this.ingredients.length === 0) {
      this.ingredients.push(this.createIngredient());
    }
  }

  ngOnInit(): void {
    this.initIngredients();

    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.recipeState.updateRecipe({
        ingredients: (value.ingredients ?? []) as IngredientModel[],
      });
    });
  }
}
