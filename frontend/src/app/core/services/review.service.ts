import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeModel } from '../models/recipe.model';
import { ReviewModel } from '../models/review.model';
import { api_endpoint } from '../constants/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);

  addReview(recipe: RecipeModel, review: ReviewModel): Observable<RecipeModel> {
    const updatedRecipe: RecipeModel = {
      ...recipe,
      reviews: [...recipe.reviews, review],
    };

    return this.http.put<RecipeModel>(api_endpoint.recipe.recipeDetail(recipe.id), updatedRecipe);
  }
}
