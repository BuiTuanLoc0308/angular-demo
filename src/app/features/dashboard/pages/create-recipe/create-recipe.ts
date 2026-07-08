import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Location, AsyncPipe } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { BasicInfoStep } from './components/basic-info-step/basic-info-step';
import { IngredientsStep } from './components/ingredients-step/ingredients-step';
import { InstructionsStep } from './components/instructions-step/instructions-step';
import { ReviewStep } from './components/review-step/review-step';
import { RecipeService } from '../../../../core/services/my-recipe.service';
import { RecipeCreateStateService } from '../../../../core/services/recipe-create-state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../core/services/snack-bar.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-create-recipe',
  imports: [
    MatIconModule,
    MatStepperModule,
    BasicInfoStep,
    IngredientsStep,
    InstructionsStep,
    ReviewStep,
    AsyncPipe,
  ],
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRecipe implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private location = inject(Location);
  private recipeService = inject(RecipeService);
  private recipeState = inject(RecipeCreateStateService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackbar = inject(SnackbarService);

  isMobile$ = this.breakpointObserver.observe('(max-width: 768px)').pipe(
    map((result) => result.matches),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  isEdit = false;
  isProcess = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  goBack() {
    this.location.back();
  }

  submitRecipe() {
    this.isProcess = true;

    const recipe = this.recipeState.getRecipe();

    if (this.isEdit) {
      this.recipeService.updateRecipe(recipe.id, recipe).subscribe({
        next: () => {
          this.snackbar.success('Cập nhật công thức thành công');

          this.isProcess = false;

          this.router.navigate(['/my-recipes']);
        },
        error: () => {
          this.snackbar.error('Có lỗi xãy ra');

          this.isProcess = false;
        },
      });
    } else {
      this.recipeService.createRecipe(recipe).subscribe({
        next: () => {
          this.snackbar.success('Tạo thành công công thức mới');

          this.isProcess = false;

          this.router.navigate(['/my-recipes']);
        },
        error: () => {
          this.snackbar.error('Có lỗi xãy ra');

          this.isProcess = false;
        },
      });
    }
  }
}
