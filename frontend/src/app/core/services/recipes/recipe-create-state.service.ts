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

  private imageFile = signal<File | null>(null);

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

  getImageFile(): File | null {
    return this.imageFile();
  }

  setImageFile(file: File | null): void {
    this.imageFile.set(file);
  }

  resetRecipe(): void {
    this.recipe.set(this.createEmptyRecipe());

    this.imageFile.set(null);
  }
}
