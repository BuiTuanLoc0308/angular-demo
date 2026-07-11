import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeCreateStateService } from '../../../../../../core/services/recipe-create-state.service';
import { IngredientModel } from '../../../../../../core/models/ingredient.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecipeFormUtilsService } from '../../services/recipe-form-utils.service';

@Component({
  selector: 'app-ingredients-step',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ingredients-step.html',
  styleUrl: './ingredients-step.scss',
})
export class IngredientsStep implements OnInit {
  private fb = inject(FormBuilder);
  private recipeState = inject(RecipeCreateStateService);
  private destroyRef = inject(DestroyRef);
  private formUtils = inject(RecipeFormUtilsService);

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
      unit: [ingredient?.unit ?? 'gram', Validators.required],
    });
  }

  private initIngredients() {
    const recipe = this.recipeState.getRecipe();

    this.formUtils.initializeArrayItems(
      this.ingredients,
      recipe.ingredients,
      (ingredient) => this.createIngredient(ingredient),
      () => this.createIngredient(),
    );
  }

  addIngredient() {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
    this.formUtils.ensureMinimumItem(this.ingredients, () => this.createIngredient());
  }

  ngOnInit() {
    this.initIngredients();

    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.recipeState.updateRecipe({
        ingredients: (value.ingredients ?? []) as IngredientModel[],
      });
    });
  }
}
