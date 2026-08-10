import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewModel } from '../../models/recipes/review.model';
import { api_endpoint } from '../../constants/api-endpoint';
import { RecipeModel } from '../../models/recipes/recipe.model';

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

    return this.http.put<RecipeModel>(api_endpoint.recipes.recipeDetail(recipe._id), updatedRecipe);
  }
}
