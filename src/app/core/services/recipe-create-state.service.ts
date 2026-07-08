import { Injectable, signal } from '@angular/core';
import { RecipeModel } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeCreateStateService {
  private createEmptyRecipe(): RecipeModel {
    return {
      id: '',

      recipeName: '',
      image: '',
      description: '',
      category: '',

      ingredients: [],
      instructions: [],
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
