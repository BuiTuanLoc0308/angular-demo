import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { catchError, combineLatest, map, of, startWith, Subject, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeCreateStateService } from '../../../../core/services/recipes/recipe-create-state.service';
import { CategoryFilter } from './components/category-filter/category-filter';
import { RecipesQueryService } from '../../../../core/services/recipes/recipes-query.service';
import { RecipeCardComponent } from './components/recipe-card/recipe-card';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { RecipeService } from '../../../../core/services/recipes/recipe.service';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [CommonModule, CategoryFilter, RecipeCardComponent, TranslatePipe, MatIconModule],
  templateUrl: './my-recipes.html',
  styleUrl: './my-recipes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyRecipes {
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private recipeState = inject(RecipeCreateStateService);
  private queryService = inject(RecipesQueryService);

  private readonly storageKey = 'favoriteRecipes';
  private favorites = this.readFavorites();

  private refresh$ = new Subject<void>();

  categories = this.queryService.categories;
  search = '';
  selectedCategory = 'ALL';
  limit = this.queryService.defaultLimit;

  readonly query$ = this.route.queryParamMap.pipe(
    map((params) => {
      const query = this.queryService.buildQuery(params, this.limit);

      this.search = query.search;
      this.selectedCategory = query.categories;
      this.limit = query.limit;

      return query;
    }),
  );

  readonly vm$ = combineLatest({
    refresh: this.refresh$.pipe(startWith(void 0)),
    query: this.query$,
  }).pipe(
    switchMap(({ query }) =>
      this.recipeService.getRecipe(query).pipe(
        map((response) => ({
          recipes: response.recipes,

          page: response.page,
          limit: response.limit,
          totalCount: response.totalCount,
          totalPages: response.totalPages,

          isLoading: false,
        })),
        startWith({
          recipes: [],

          page: 1,
          limit: query.limit,
          totalCount: 0,
          totalPages: 0,

          isLoading: true,
        }),
        catchError(() =>
          of({
            recipes: [],

            page: 1,
            limit: query.limit,
            totalCount: 0,
            totalPages: 0,

            isLoading: false,
          }),
        ),
      ),
    ),
  );

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.queryService.updateSearch(this.route, this.router, value);
  }

  onCategoryChange(categories: string) {
    this.queryService.updateCategory(this.route, this.router, categories);
  }

  previousPage(page: number) {
    this.queryService.previousPage(this.route, this.router, page);
  }

  nextPage(page: number, totalPages: number) {
    this.queryService.nextPage(this.route, this.router, page, totalPages);
  }

  onCreate() {
    this.recipeState.resetRecipe();
    this.router.navigate(['/create-recipe']);
  }

  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  toggleFavorite(id: string): void {
    if (this.isFavorite(id)) {
      this.favorites = this.favorites.filter((favoriteId) => favoriteId !== id);
    } else {
      this.favorites = [...this.favorites, id];
    }

    this.persistFavorites();
  }

  getFavorites(): string[] {
    return [...this.favorites];
  }

  private readFavorites(): string[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const storedValue = localStorage.getItem(this.storageKey);

    return storedValue ? JSON.parse(storedValue) : [];
  }

  private persistFavorites(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  }
}
