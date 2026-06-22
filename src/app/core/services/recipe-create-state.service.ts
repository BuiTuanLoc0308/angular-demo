import { Injectable } from '@angular/core';
import { RecipeModel } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeCreateStateService {
  recipe: RecipeModel = {
    id: '',

    recipeName: '',
    image: '',
    description: '',
    category: '',

    ingredients: [],
    instructions: [],
  };

  getRecipe(): RecipeModel {
    return this.recipe;
  }

  updateRecipe(data: Partial<RecipeModel>) {
    this.recipe = {
      ...this.recipe,
      ...data,
    };
  }
}
