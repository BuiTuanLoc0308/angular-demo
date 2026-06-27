import { Component } from '@angular/core';
import { RecipeCreateStateService } from '../../../../../../core/services/recipe-create-state.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-review-step',
  imports: [MatIconModule],
  templateUrl: './review-step.html',
  styleUrl: './review-step.scss',
})
export class ReviewStep {
  constructor(public recipeState: RecipeCreateStateService) {}

  get recipe() {
    return this.recipeState.recipe;
  }
}
