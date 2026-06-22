import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeCreateStateService } from '../../../../../../core/services/recipe-create-state.service';

@Component({
  selector: 'app-ingredients-step',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ingredients-step.html',
  styleUrl: './ingredients-step.scss',
})
export class IngredientsStep {
  private fb = inject(FormBuilder);
  private recipeState = inject(RecipeCreateStateService);

  form = this.fb.group({
    ingredients: this.fb.array([this.createIngredient()]),
  });

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      ingredientName: ['', Validators.required],
      quantity: ['', Validators.required],
      unit: ['gram', Validators.required],
    });
  }

  addIngredient() {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      this.recipeState.updateRecipe({
        ingredients: value.ingredients,
      });

      console.log('Ingredients:', value.ingredients);
      console.log('Recipe State:', this.recipeState.recipe);
    });
  }
}
