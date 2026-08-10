import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeQuery } from '../../models/recipes/recipe-query.model';
import { RecipeResponse } from '../../models/recipes/recipe-response.model';
import { api_endpoint } from '../../constants/api-endpoint';
import { RecipeModel } from '../../models/recipes/recipe.model';

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

  createRecipe(recipe: RecipeModel) {
    return this.http.post(api_endpoint.recipes.recipe, recipe);
  }

  updateRecipe(id: string, data: RecipeModel) {
    return this.http.put(`${api_endpoint.recipes.recipe}/${id}`, data);
  }

  deleteRecipe(id: string) {
    return this.http.delete(`${api_endpoint.recipes.recipe}/${id}`);
  }
}
