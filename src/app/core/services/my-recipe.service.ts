import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from '../models/recipe.model';
import { api_endpoint } from '../constants/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getMyRecipe(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(api_endpoint.recipe.myRecipe);
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
