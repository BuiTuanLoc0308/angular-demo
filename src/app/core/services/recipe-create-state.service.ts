import { Injectable } from '@angular/core';
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

  recipe: RecipeModel = this.createEmptyRecipe();

  getRecipe(): RecipeModel {
    return this.recipe;
  }

  updateRecipe(data: Partial<RecipeModel>) {
    this.recipe = {
      ...this.recipe,
      ...data,
    };
  }

  setRecipe(recipe: RecipeModel) {
    this.recipe = { ...recipe };
  }

  resetRecipe() {
    this.recipe = this.createEmptyRecipe();
  }
}
