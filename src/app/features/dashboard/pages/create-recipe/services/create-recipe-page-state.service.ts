import { inject, Injectable, signal } from '@angular/core';
import { RecipeModel } from '../../../../../core/models/recipe.model';
import { CreateRecipeActionsService } from './create-recipe-actions.service';

@Injectable({
  providedIn: 'root',
})
export class CreateRecipePageStateService {
  private actionsService = inject(CreateRecipeActionsService);

  readonly isEdit = signal(false);
  readonly isProcess = signal(false);

  initializeFromRouteParam(id: string | null): void {
    this.isEdit.set(id !== null);
  }

  submitRecipe(recipe: RecipeModel): void {
    this.isProcess.set(true);

    this.actionsService.submitRecipe(recipe, this.isEdit(), () => {
      this.isProcess.set(false);
    });
  }
}
