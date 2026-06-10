import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { RecipeModel } from '../../../../core/models/recipe.model';
import { RecipeService } from '../../../../core/services/my-recipe.service';
import { CategoryFilter } from '../../../../shared/components/category-filter/category-filter';

@Component({
  selector: 'app-my-recipes',
  imports: [CommonModule, CategoryFilter],
  standalone: true,
  templateUrl: './my-recipes.html',
  styleUrl: './my-recipes.scss',
})
export class MyRecipes {
  private recipeService = inject(RecipeService);

  vm$ = this.recipeService.getMyRecipe().pipe(
    map((recipes) => ({ recipes, isLoading: false })),
    startWith({ recipes: [], isLoading: true }),
    catchError(() => of({ recipes: [], isLoading: false })),
  );

  categories = ['Tất cả', 'Bữa sáng', 'Bữa trưa', 'Bữa tối', 'Tráng miệng'];

  selectedCategory = 'Tất cả';

  onCategoryChange(category: string) {
    this.selectedCategory = category;

    console.log(category);
  }
}
