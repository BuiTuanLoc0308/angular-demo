import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecipesQueryService {
  readonly defaultLimit = 10;

  readonly categories = ['ALL', 'BREAKFAST', 'LUNCH', 'DINNER', 'DESSERT', 'DRINK'];

  buildQuery(params: ParamMap, defaultLimit: number = this.defaultLimit) {
    return {
      search: params.get('search') ?? '',
      categories: params.get('categories') ?? 'ALL',
      page: Number(params.get('page') ?? 1),
      limit: Number(params.get('limit') ?? defaultLimit),
    };
  }

  updateSearch(route: ActivatedRoute, router: Router, value: string): void {
    router.navigate([], {
      relativeTo: route,
      queryParams: {
        search: value || null,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  updateCategory(route: ActivatedRoute, router: Router, categories: string): void {
    router.navigate([], {
      relativeTo: route,
      queryParams: {
        categories: categories === 'ALL' ? null : categories,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  previousPage(route: ActivatedRoute, router: Router, currentPage: number): void {
    if (currentPage <= 1) {
      return;
    }

    router.navigate([], {
      relativeTo: route,
      queryParams: {
        page: currentPage - 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  nextPage(route: ActivatedRoute, router: Router, currentPage: number, totalPages: number): void {
    if (currentPage >= totalPages) {
      return;
    }

    router.navigate([], {
      relativeTo: route,
      queryParams: {
        page: currentPage + 1,
      },
      queryParamsHandling: 'merge',
    });
  }
}
