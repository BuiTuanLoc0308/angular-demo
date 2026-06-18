import { Component } from '@angular/core';
import { RecipeCreateStateService } from '../../../../../../core/services/recipe-create-state.service';
import { RecipeService } from '../../../../../../core/services/my-recipe.service';

@Component({
  selector: 'app-review-step',
  imports: [],
  templateUrl: './review-step.html',
  styleUrl: './review-step.scss',
})
export class ReviewStep {
  constructor(
    private recipeState: RecipeCreateStateService,
    private recipeService: RecipeService,
  ) {}

  // submitRecipe() {
  //   this.recipeService.createRecipe(this.recipeState.recipe).subscribe({
  //     next: () => {
  //       console.log('Created successfully');
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //   });
  // }
}
