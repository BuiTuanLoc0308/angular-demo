import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from '../../../../core/models/recipe.model';
import { RecipeService } from '../../../../core/services/my-recipe.service';

@Component({
  selector: 'app-my-recipes',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './my-recipes.html',
  styleUrl: './my-recipes.scss',
})
export class MyRecipes {
  recipe$: Observable<RecipeModel[]>;

  constructor(private recipeService: RecipeService) {
    this.recipe$ = this.recipeService.getMyRecipe();
  }
}
