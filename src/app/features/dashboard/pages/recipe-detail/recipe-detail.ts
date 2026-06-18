import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { RecipeModel } from '../../../../core/models/recipe.model';
import { RecipeService } from '../../../../core/services/my-recipe.service';

@Component({
  selector: 'app-recipe-detail',
  imports: [MatIconModule, AsyncPipe],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail {
  private route = inject(ActivatedRoute);

  isDeleting = false;

  vm$ = this.route.paramMap.pipe(
    map((params) => params.get('id')!),
    switchMap((id) =>
      this.recipeService.getRecipeById(id).pipe(
        map((recipe) => ({
          recipe,
          isLoading: false,
          error: false,
        })),
        startWith({
          recipe: null as RecipeModel | null,
          isLoading: true,
          error: false,
        }),
        catchError(() =>
          of({
            recipe: null,
            isLoading: false,
            error: true,
          }),
        ),
      ),
    ),
  );

  constructor(
    private recipeService: RecipeService,
    private location: Location,
    private router: Router,
  ) {}

  goBack() {
    this.location.back();
  }

  onDelete(id: string) {
    this.isDeleting = true;

    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        console.log('Delete success');

        this.isDeleting = false;

        this.router.navigate(['/my-recipes']);
      },
      error: (err) => {
        console.error('Delete failed', err);

        this.isDeleting = false;
      },
    });
  }
}
