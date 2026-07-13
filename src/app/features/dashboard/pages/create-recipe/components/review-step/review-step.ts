import { Component, inject } from '@angular/core';
import { RecipeCreateStateService } from '../../../../../../core/services/recipe-create-state.service';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-review-step',
  imports: [MatIconModule, TranslatePipe],
  templateUrl: './review-step.html',
  styleUrl: './review-step.scss',
})
export class ReviewStep {
  public recipeState = inject(RecipeCreateStateService);

  get recipe() {
    return this.recipeState.recipe;
  }
}
