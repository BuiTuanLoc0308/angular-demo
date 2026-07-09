import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { catchError, combineLatest, map, of, startWith, Subject, switchMap } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../../../core/services/my-recipe.service';
import { RecipeCreateStateService } from '../../../../core/services/recipe-create-state.service';
import { CategoryFilter } from '../../../../shared/components/category-filter/category-filter';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [CommonModule, CategoryFilter, RouterLink],
  templateUrl: './my-recipes.html',
  styleUrl: './my-recipes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyRecipes implements OnInit {
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private recipeState = inject(RecipeCreateStateService);

  private refresh$ = new Subject<void>();

  categories = ['Tất cả', 'Bữa sáng', 'Bữa trưa', 'Bữa tối', 'Tráng miệng', 'Đồ uống'];

  favoriteRecipes: string[] = [];

  search = '';
  category = 'Tất cả';

  currentPage = 1;
  limit = 10;

  readonly query$ = this.route.queryParamMap.pipe(
    map((params) => {
      const query = {
        search: params.get('search') ?? '',
        category: params.get('category') ?? 'Tất cả',
        page: Number(params.get('page') ?? 1),
        limit: Number(params.get('limit') ?? this.limit),
      };

      this.search = query.search;
      this.category = query.category;
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
        page: 1,
      },

      queryParamsHandling: 'merge',
    });
  }

  onCategoryChange(category: string) {
    this.router.navigate([], {
      relativeTo: this.route,

      queryParams: {
        category: category === 'Tất cả' ? null : category,
        page: 1,
      },

      queryParamsHandling: 'merge',
    });
  }

  previousPage() {
    if (this.currentPage <= 1) return;

    this.router.navigate([], {
      relativeTo: this.route,

      queryParams: {
        page: this.currentPage - 1,
      },

      queryParamsHandling: 'merge',
    });
  }

  nextPage() {
    this.router.navigate([], {
      relativeTo: this.route,

      queryParams: {
        page: this.currentPage + 1,
      },

      queryParamsHandling: 'merge',
    });
  }

  onCreate() {
    this.recipeState.resetRecipe();

    this.router.navigate(['/create-recipe']);
  }

  ngOnInit() {
    const data = localStorage.getItem('favoriteRecipes');

    this.favoriteRecipes = data ? JSON.parse(data) : [];
  }

  isFavorite(id: string): boolean {
    return this.favoriteRecipes.includes(id);
  }

  toggleFavorite(id: string) {
    if (this.isFavorite(id)) {
      this.favoriteRecipes = this.favoriteRecipes.filter((x) => x !== id);
    } else {
      this.favoriteRecipes.push(id);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(this.favoriteRecipes));
  }
}
