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
}
