import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RecipeModel } from '../models/recipe.model';
import { RecipeService } from '../services/my-recipe.service';

export const recipeDetailResolver: ResolveFn<RecipeModel> = (route) => {
  const recipeService = inject(RecipeService);

  const id = route.paramMap.get('id')!;

  return recipeService.getRecipeById(id);
};
