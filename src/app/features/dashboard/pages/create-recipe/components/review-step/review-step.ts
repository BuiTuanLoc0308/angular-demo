import { Component } from '@angular/core';
import { RecipeCreateStateService } from '../../../../../../core/services/recipe-create-state.service';
import { RecipeModel } from '../../../../../../core/models/recipe.model';

@Component({
  selector: 'app-review-step',
  imports: [],
  templateUrl: './review-step.html',
  styleUrl: './review-step.scss',
})
export class ReviewStep {
  constructor(public recipeState: RecipeCreateStateService) {}

  get recipe() {
    return this.recipeState.recipe;
  }
}
