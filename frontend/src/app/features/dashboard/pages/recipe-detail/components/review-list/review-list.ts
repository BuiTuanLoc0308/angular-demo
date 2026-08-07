import { Component, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { RecipeModel } from '../../../../../../core/models/recipe.model';
import { ReviewModel } from '../../../../../../core/models/review.model';
import { ReviewForm } from '../review-form/review-form';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [MatIconModule, TranslatePipe, ReviewForm],
  templateUrl: './review-list.html',
  styleUrl: './review-list.scss',
})
export class ReviewList {
  recipe = input.required<RecipeModel>();

  reviewAdded = output<void>();

  private reviewService = inject(ReviewService);

  showReviewForm = false;

  toggleReviewForm() {
    this.showReviewForm = !this.showReviewForm;
  }

  closeReviewForm() {
    this.showReviewForm = false;
  }

  addReview(review: ReviewModel) {
    this.reviewService.addReview(this.recipe(), review).subscribe({
      next: () => {
        this.showReviewForm = false;

        this.reviewAdded.emit();
      },
      error: (err) => {
        console.error('Add review failed', err);
      },
    });
  }
}
