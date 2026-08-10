import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../snackbar/snack-bar.service';
import { RecipeModel } from '../../models/recipes/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeEditorService {
  private recipeService = inject(RecipeService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  readonly isEdit = signal(false);
  readonly isProcess = signal(false);

  initializeFromRouteParam(id: string | null): void {
    this.isEdit.set(id !== null);
  }

  submitRecipe(recipe: RecipeModel): void {
    this.isProcess.set(true);

    if (this.isEdit()) {
      this.recipeService.updateRecipe(recipe._id, recipe).subscribe({
        next: () => {
          this.snackbar.success(this.translate.instant('SUCCESS.UPDATE_RECIPE'));

          this.isProcess.set(false);
          this.router.navigate(['/my-recipes']);
        },

        error: () => {
          this.snackbar.error(this.translate.instant('ERRORS.GENERIC'));

          this.isProcess.set(false);
        },
      });

      return;
    }

    this.recipeService.createRecipe(recipe).subscribe({
      next: () => {
        this.snackbar.success(this.translate.instant('SUCCESS.CREATE_RECIPE'));

        this.isProcess.set(false);
        this.router.navigate(['/my-recipes']);
      },

      error: () => {
        this.snackbar.error(this.translate.instant('ERRORS.GENERIC'));

        this.isProcess.set(false);
      },
    });
  }
}
