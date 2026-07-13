import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from '../../../../../core/models/recipe.model';
import { RecipeService } from '../../../../../core/services/my-recipe.service';
import { SnackbarService } from '../../../../../core/services/snack-bar.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CreateRecipeActionsService {
  private recipeService = inject(RecipeService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  submitRecipe(recipe: RecipeModel, isEdit: boolean, onComplete?: () => void): void {
    if (isEdit) {
      this.recipeService.updateRecipe(recipe.id, recipe).subscribe({
        next: () => {
          this.snackbar.success(this.translate.instant('CREATE_RECIPE.UPDATE_SUCCESS'));
          onComplete?.();
          this.router.navigate(['/my-recipes']);
        },
        error: () => {
          this.snackbar.error(this.translate.instant('CREATE_RECIPE.GENERIC_ERROR'));
          onComplete?.();
        },
      });

      return;
    }

    this.recipeService.createRecipe(recipe).subscribe({
      next: () => {
        this.snackbar.success(this.translate.instant('CREATE_RECIPE.CREATE_SUCCESS'));
        onComplete?.();
        this.router.navigate(['/my-recipes']);
      },
      error: () => {
        this.snackbar.error(this.translate.instant('CREATE_RECIPE.GENERIC_ERROR'));
        onComplete?.();
      },
    });
  }
}
