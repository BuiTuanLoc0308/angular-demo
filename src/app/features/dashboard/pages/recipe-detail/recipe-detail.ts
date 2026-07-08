import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RecipeService } from '../../../../core/services/my-recipe.service';
import { RecipeCreateStateService } from '../../../../core/services/recipe-create-state.service';
import { SnackbarService } from '../../../../core/services/snack-bar.service';
import { map } from 'rxjs';
import { RecipeModel } from '../../../../core/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  imports: [MatIconModule, AsyncPipe],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetail {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  private location = inject(Location);
  private router = inject(Router);
  private recipeCreateState = inject(RecipeCreateStateService);
  private snackbar = inject(SnackbarService);

  isDeleting = false;

  recipe$ = this.route.data.pipe(map((data) => data['recipe'] as RecipeModel));

  goBack() {
    this.location.back();
  }

  onDelete(id: string) {
    this.isDeleting = true;

    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        this.snackbar.success('Xóa thành công công thức');

        this.isDeleting = false;

        this.router.navigate(['/my-recipes']);
      },
      error: () => {
        this.snackbar.error('Có lỗi xãy ra');

        this.isDeleting = false;
      },
    });
  }

  onEdit(recipe: RecipeModel) {
    this.recipeCreateState.setRecipe(recipe);

    this.router.navigate(['/create-recipe', recipe.id]);
  }
}
