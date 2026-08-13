import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../snackbar/snack-bar.service';
import { RecipeModel } from '../../models/recipes/recipe.model';
import { RecipeService } from './recipe.service';
import { RecipeRequestModel } from '../../models/recipes/recipe-request.model';

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

  submitRecipe(recipe: RecipeRequestModel | RecipeModel, imageFile: File | null = null): void {
    this.isProcess.set(true);

    if (this.isEdit()) {
      const recipeModel = recipe as RecipeModel;

      this.recipeService.updateRecipe(recipeModel._id, recipeModel, imageFile).subscribe({
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

    this.recipeService.createRecipe(recipe as RecipeRequestModel, imageFile).subscribe({
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
