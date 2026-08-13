import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeQuery } from '../../models/recipes/recipe-query.model';
import { RecipeResponse } from '../../models/recipes/recipe-response.model';
import { api_endpoint } from '../../constants/api-endpoint';
import { RecipeModel } from '../../models/recipes/recipe.model';
import { RecipeRequestModel } from '../../models/recipes/recipe-request.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);

  getRecipe(query: RecipeQuery): Observable<RecipeResponse> {
    let params = new HttpParams().set('page', query.page).set('limit', query.limit);

    if (query.search) {
      params = params.set('search', query.search);
    }

    if (query.categories !== 'ALL') {
      params = params.set('categories', query.categories);
    }

    return this.http.get<RecipeResponse>(api_endpoint.recipes.recipe, {
      params,
    });
  }

  getRecipeById(id: string): Observable<RecipeModel> {
    return this.http.get<RecipeModel>(`${api_endpoint.recipes.recipe}/${id}`);
  }

  createRecipe(recipe: RecipeRequestModel, imageFile: File | null): Observable<RecipeModel> {
    const formData = new FormData();

    formData.append('recipeName', recipe.recipeName);
    formData.append('description', recipe.description);

    formData.append('categories', JSON.stringify(recipe.categories));
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('instructions', JSON.stringify(recipe.instructions));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post<RecipeModel>(api_endpoint.recipes.recipe, formData);
  }

  updateRecipe(
    id: string,
    recipe: RecipeRequestModel,
    imageFile: File | null,
  ): Observable<RecipeModel> {
    const formData = new FormData();

    formData.append('recipeName', recipe.recipeName);
    formData.append('description', recipe.description);

    formData.append('categories', JSON.stringify(recipe.categories));

    formData.append('ingredients', JSON.stringify(recipe.ingredients));

    formData.append('instructions', JSON.stringify(recipe.instructions));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.put<RecipeModel>(`${api_endpoint.recipes.recipe}/${id}`, formData);
  }

  deleteRecipe(id: string) {
    return this.http.delete(`${api_endpoint.recipes.recipe}/${id}`);
  }
}
