import { Injectable, signal } from '@angular/core';
import { RecipeModel } from '../../models/recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeCreateStateService {
  private createEmptyRecipe(): RecipeModel {
    return {
      _id: '',

      recipeName: '',
      image: '',
      description: '',
      categories: [],

      ingredients: [],
      instructions: [],

      reviews: [],
    };
  }

  readonly recipe = signal<RecipeModel>(this.createEmptyRecipe());

  getRecipe(): RecipeModel {
    return this.recipe();
  }

  updateRecipe(data: Partial<RecipeModel>): void {
    this.recipe.update((recipe) => ({
      ...recipe,
      ...data,
    }));
  }

  setRecipe(recipe: RecipeModel): void {
    this.recipe.set({ ...recipe });
  }

  resetRecipe(): void {
    this.recipe.set(this.createEmptyRecipe());
  }
}
