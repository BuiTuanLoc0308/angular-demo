import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { catchError, combineLatest, map, of, startWith, Subject, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../../core/services/my-recipe.service';
import { RecipeCreateStateService } from '../../../../core/services/recipe-create-state.service';
import { CategoryFilter } from './components/category-filter/category-filter';
import { MyRecipesQueryService } from '../../../../core/services/my-recipes-query.service';
import { FavoritesStorageService } from '../../../../core/services/favorites-storage.service';
import { RecipeCardComponent } from './components/recipe-card/recipe-card';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

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
  private queryService = inject(MyRecipesQueryService);
  private favoritesService = inject(FavoritesStorageService);

  private refresh$ = new Subject<void>();

  categories = this.queryService.categories;
  search = '';
  selectedCategory = 'ALL';
  currentPage = 1;
  limit = this.queryService.defaultLimit;

  readonly query$ = this.route.queryParamMap.pipe(
    map((params) => {
      const query = this.queryService.buildQuery(params, this.limit);

      this.search = query.search;
      this.selectedCategory = query.categories;
      this.currentPage = query.page;
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
    this.queryService.updateSearch(this.route, this.router, value);
  }

  onCategoryChange(categories: string) {
    this.queryService.updateCategory(this.route, this.router, categories);
  }

  previousPage() {
    this.queryService.previousPage(this.route, this.router, this.currentPage);
  }

  nextPage() {
    this.queryService.nextPage(this.route, this.router, this.currentPage);
  }

  onCreate() {
    this.recipeState.resetRecipe();
    this.router.navigate(['/create-recipe']);
  }

  isFavorite(id: string): boolean {
    return this.favoritesService.isFavorite(id);
  }

  toggleFavorite(id: string) {
    this.favoritesService.toggleFavorite(id);
  }
}
