import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../../../../../core/services/my-recipe.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basic-info-step',
  imports: [FormsModule, RouterLink],
  templateUrl: './basic-info-step.html',
  styleUrl: './basic-info-step.scss',
})
export class BasicInfoStep {
  recipeName = '';

  constructor(private recipeService: RecipeService) {}

  onSave() {
    this.recipeService.createRecipe(this.recipeName).subscribe({
      next: (response) => {
        console.log('Saved successfully', response);
      },
      error: (error) => {
        console.error('Save failed', error);
      },
    });
  }
}
