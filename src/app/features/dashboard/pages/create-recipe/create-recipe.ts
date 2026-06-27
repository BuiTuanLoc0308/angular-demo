import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { BasicInfoStep } from './components/basic-info-step/basic-info-step';
import { IngredientsStep } from './components/ingredients-step/ingredients-step';
import { InstructionsStep } from './components/instructions-step/instructions-step';
import { ReviewStep } from './components/review-step/review-step';
import { RecipeService } from '../../../../core/services/my-recipe.service';
import { RecipeCreateStateService } from '../../../../core/services/recipe-create-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  imports: [
    MatIconModule,
    MatStepperModule,
    BasicInfoStep,
    IngredientsStep,
    InstructionsStep,
    ReviewStep,
  ],
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.scss',
})
export class CreateRecipe {
  constructor(
    private location: Location,
    private recipeService: RecipeService,
    private recipeState: RecipeCreateStateService,
    private router: Router,
  ) {}

  goBack() {
    this.location.back();
  }

  submitRecipe() {
    const recipe = this.recipeState.getRecipe();

    console.log(recipe);

    this.recipeService.createRecipe(recipe).subscribe({
      next: (res) => {
        console.log('Lưu thành công', res);

        this.router.navigate(['/my-recipes']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
