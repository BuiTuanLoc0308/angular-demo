import { Injectable } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MyRecipesQueryService {
  readonly defaultLimit = 10;
  readonly categories = ['Tất cả', 'Bữa sáng', 'Bữa trưa', 'Bữa tối', 'Tráng miệng', 'Đồ uống'];

  buildQuery(params: ParamMap, defaultLimit: number = this.defaultLimit) {
    return {
      search: params.get('search') ?? '',
      category: params.get('category') ?? 'Tất cả',
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

  updateCategory(route: ActivatedRoute, router: Router, category: string): void {
    router.navigate([], {
      relativeTo: route,
      queryParams: {
        category: category === 'Tất cả' ? null : category,
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

  nextPage(route: ActivatedRoute, router: Router, currentPage: number): void {
    router.navigate([], {
      relativeTo: route,
      queryParams: {
        page: currentPage + 1,
      },
      queryParamsHandling: 'merge',
    });
  }
}
