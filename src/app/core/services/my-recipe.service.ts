import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from '../models/recipe.model';
import { api_endpoint } from '../constants/api-endpoint';
import { RecipeQuery } from '../models/recipe-query.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);

  getMyRecipe(query: RecipeQuery): Observable<RecipeModel[]> {
    let params = new HttpParams().set('page', query.page).set('limit', query.limit);

    if (query.search) {
      params = params.set('search', query.search);
    }

    if (query.category !== 'Tất cả') {
      params = params.set('category', query.category);
    }

    return this.http.get<RecipeModel[]>(api_endpoint.recipe.myRecipe, {
      params,
    });
  }

  getRecipeById(id: string): Observable<RecipeModel> {
    return this.http.get<RecipeModel>(`${api_endpoint.recipe.myRecipe}/${id}`);
  }

  createRecipe(recipe: RecipeModel) {
    return this.http.post(api_endpoint.recipe.myRecipe, recipe);
  }

  updateRecipe(id: string, data: RecipeModel) {
    return this.http.put(`${api_endpoint.recipe.myRecipe}/${id}`, data);
  }

  deleteRecipe(id: string) {
    return this.http.delete(`${api_endpoint.recipe.myRecipe}/${id}`);
  }
}
