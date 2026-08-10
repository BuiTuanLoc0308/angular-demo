import { Injectable, signal } from '@angular/core';
import { RecipeRequestModel } from '../../models/recipes/recipe-request.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeCreateStateService {
  private createEmptyRecipe(): RecipeRequestModel {
    return {
      recipeName: '',
      image: '',
      description: '',
      categories: [],

      ingredients: [],
      instructions: [],
    };
  }

  readonly recipe = signal<RecipeRequestModel>(this.createEmptyRecipe());

  getRecipe(): RecipeRequestModel {
    return this.recipe();
  }

  updateRecipe(data: Partial<RecipeRequestModel>): void {
    this.recipe.update((recipe) => ({
      ...recipe,
      ...data,
    }));
  }

  setRecipe(recipe: RecipeRequestModel): void {
    this.recipe.set({ ...recipe });
  }

  resetRecipe(): void {
    this.recipe.set(this.createEmptyRecipe());
  }
}
