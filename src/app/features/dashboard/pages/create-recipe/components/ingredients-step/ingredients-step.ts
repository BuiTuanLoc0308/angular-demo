import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeCreateStateService } from '../../../../../../core/services/recipe-create-state.service';
import { IngredientModel } from '../../../../../../core/models/ingredient.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

    // Neu an edit
    if (recipe.ingredients.length > 0) {
      recipe.ingredients.forEach((ingredient) => {
        this.ingredients.push(this.createIngredient(ingredient));
      });
    }
    // Neu an create
    else {
      this.ingredients.push(this.createIngredient());
    }
  }

  addIngredient() {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);

    if (this.ingredients.length === 0) {
      this.addIngredient();
    }
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
