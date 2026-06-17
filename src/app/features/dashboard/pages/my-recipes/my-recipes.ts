import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';
import { RecipeService } from '../../../../core/services/my-recipe.service';
import { CategoryFilter } from '../../../../shared/components/category-filter/category-filter';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-my-recipes',
  imports: [CommonModule, CategoryFilter, RouterLink],
  standalone: true,
  templateUrl: './my-recipes.html',
  styleUrl: './my-recipes.scss',
})
export class MyRecipes {
  private recipeService = inject(RecipeService);
  private refresh$ = new Subject<void>();

  constructor(private router: Router) {}

  deletingRecipeId: string | null = null;

  vm$ = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.recipeService.getMyRecipe().pipe(
        map((recipes) => ({ recipes, isLoading: false })),
        startWith({ recipes: [], isLoading: true }),
        catchError(() => of({ recipes: [], isLoading: false })),
      ),
    ),
  );

  categories = ['Tất cả', 'Bữa sáng', 'Bữa trưa', 'Bữa tối', 'Tráng miệng'];

  selectedCategory = 'Tất cả';

  onCategoryChange(category: string) {
    this.selectedCategory = category;

    console.log(category);
  }

  onDelete(id: string) {
    this.deletingRecipeId = id;

    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        console.log('Delete success');

        this.refresh$.next();

        this.deletingRecipeId = null;
      },
      error: (err) => {
        console.error('Delete failed', err);

        this.deletingRecipeId = null;
      },
    });
  }

  onClick(id: string) {
    this.router.navigate(['/my-recipes', id]);
  }
}
