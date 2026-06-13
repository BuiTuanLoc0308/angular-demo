import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../../../../../core/services/my-recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-info-step',
  imports: [FormsModule],
  templateUrl: './basic-info-step.html',
  styleUrl: './basic-info-step.scss',
})
export class BasicInfoStep {
  recipeName = '';

  isSaving = false;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
  ) {}

  onSave() {
    this.isSaving = true;

    this.recipeService.createRecipe(this.recipeName).subscribe({
      next: (response) => {
        console.log('Saved successfully', response);

        this.router.navigate(['/my-recipes']);
      },
      error: (error) => {
        console.error('Save failed', error);

        this.isSaving = false;
      },
    });
  }
}
