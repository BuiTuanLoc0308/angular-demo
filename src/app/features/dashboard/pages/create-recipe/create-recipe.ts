import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { BasicInfoStep } from './components/basic-info-step/basic-info-step';
import { IngredientsStep } from './components/ingredients-step/ingredients-step';
import { InstructionsStep } from './components/instructions-step/instructions-step';
import { ReviewStep } from './components/review-step/review-step';
import { RecipeService } from '../../../../core/services/my-recipe.service';
import { RecipeCreateStateService } from '../../../../core/services/recipe-create-state.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  isEdit = false;
  isProcess = false;
  isMobile = window.innerWidth < 768;

  constructor(
    private location: Location,
    private recipeService: RecipeService,
    private recipeState: RecipeCreateStateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

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
        next: (res) => {
          console.log('Cập nhật thành công', res);

          this.isProcess = false;

          this.router.navigate(['/my-recipes']);
        },
        error: (err) => {
          console.log(err);

          this.isProcess = false;
        },
      });
    } else {
      this.recipeService.createRecipe(recipe).subscribe({
        next: (res) => {
          console.log('Tạo thành công', res);

          this.isProcess = false;

          this.router.navigate(['/my-recipes']);
        },
        error: (err) => {
          console.log(err);

          this.isProcess = false;
        },
      });
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 1024;
  }
}
