import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from '../../../../../core/models/recipe.model';
import { RecipeService } from '../../../../../core/services/my-recipe.service';
import { SnackbarService } from '../../../../../core/services/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class CreateRecipeActionsService {
  private recipeService = inject(RecipeService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);

  submitRecipe(recipe: RecipeModel, isEdit: boolean, onComplete?: () => void): void {
    if (isEdit) {
      this.recipeService.updateRecipe(recipe.id, recipe).subscribe({
        next: () => {
          this.snackbar.success('Cập nhật công thức thành công');
          onComplete?.();
          this.router.navigate(['/my-recipes']);
        },
        error: () => {
          this.snackbar.error('Có lỗi xãy ra');
          onComplete?.();
        },
      });

      return;
    }

    this.recipeService.createRecipe(recipe).subscribe({
      next: () => {
        this.snackbar.success('Tạo thành công công thức mới');
        onComplete?.();
        this.router.navigate(['/my-recipes']);
      },
      error: () => {
        this.snackbar.error('Có lỗi xãy ra');
        onComplete?.();
      },
    });
  }
}
