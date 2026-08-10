import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RecipeCreateStateService } from '../../../../core/services/recipes/recipe-create-state.service';
import { SnackbarService } from '../../../../core/services/snackbar/snack-bar.service';
import { BehaviorSubject, switchMap } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ReviewList } from './components/review-list/review-list';
import { RecipeModel } from '../../../../core/models/recipes/recipe.model';
import { RecipeService } from '../../../../core/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  imports: [MatIconModule, AsyncPipe, TranslatePipe, ReviewList],
  standalone: true,
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
  private translate = inject(TranslateService);
  private refresh$ = new BehaviorSubject<void>(undefined);

  isDeleting = false;

  recipe$ = this.refresh$.pipe(
    switchMap(() => {
      const id = this.route.snapshot.paramMap.get('id')!;

      return this.recipeService.getRecipeById(id);
    }),
  );

  onReviewAdded() {
    this.refresh$.next();
  }

  goBack() {
    this.location.back();
  }

  onDelete(id: string) {
    this.isDeleting = true;

    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        this.snackbar.success(this.translate.instant('SUCCESS.DELETE_RECIPE'));

        this.isDeleting = false;

        this.router.navigate(['/my-recipes']);
      },
      error: () => {
        this.snackbar.error(this.translate.instant('ERRORS.GENERIC'));

        this.isDeleting = false;
      },
    });
  }

  onEdit(recipe: RecipeModel) {
    this.recipeCreateState.setRecipe(recipe);

    this.router.navigate(['/create-recipe', recipe._id]);
  }
}
