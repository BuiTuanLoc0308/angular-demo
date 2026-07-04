import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, combineLatest, map, of, startWith, Subject, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../../core/services/my-recipe.service';
import { RecipeCreateStateService } from '../../../../core/services/recipe-create-state.service';
import { CategoryFilter } from '../../../../shared/components/category-filter/category-filter';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [CommonModule, CategoryFilter],
  templateUrl: './my-recipes.html',
  styleUrl: './my-recipes.scss',
})
export class MyRecipes {
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private recipeState = inject(RecipeCreateStateService);

  private refresh$ = new Subject<void>();

  categories = ['Tất cả', 'Bữa sáng', 'Bữa trưa', 'Bữa tối', 'Tráng miệng', 'Đồ uống'];

  search = '';

  category = 'Tất cả';

  readonly query$ = this.route.queryParamMap.pipe(
    map((params) => {
      const query = {
        search: params.get('search') ?? '',
        category: params.get('category') ?? 'Tất cả',
      };

      this.search = query.search;
      this.category = query.category;

      return query;
    }),
  );

  readonly vm$ = combineLatest({
    refresh: this.refresh$.pipe(startWith(void 0)),
    query: this.query$,
  }).pipe(
    switchMap(({ query }) =>
      this.recipeService.getMyRecipe(query).pipe(
        map((recipes) => ({
          recipes,
          isLoading: false,
        })),
        startWith({
          recipes: [],
          isLoading: true,
        }),
        catchError(() =>
          of({
            recipes: [],
            isLoading: false,
          }),
        ),
      ),
    ),
  );

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.router.navigate([], {
      relativeTo: this.route,

      queryParams: {
        search: value || null,
      },

      queryParamsHandling: 'merge',
    });
  }

  onCategoryChange(category: string) {
    this.router.navigate([], {
      relativeTo: this.route,

      queryParams: {
        category: category === 'Tất cả' ? null : category,
      },

      queryParamsHandling: 'merge',
    });
  }

  onDetail(id: string) {
    this.router.navigate(['/my-recipes', id]);
  }

  onCreate() {
    this.recipeState.resetRecipe();

    this.router.navigate(['/create-recipe']);
  }
}
