import { Component, output } from '@angular/core';
import { ReviewModel } from '../../../../../../core/models/review.model';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-review-form',
  imports: [FormsModule, MatIconModule],
  templateUrl: './review-form.html',
  styleUrl: './review-form.scss',
})
export class ReviewForm {
  canceled = output<void>();
  submitted = output<ReviewModel>();

  rating = 0;
  comment = '';

  onSubmit() {
    this.submitted.emit({
      rating: this.rating,
      comment: this.comment,
    });
  }

  onCancel() {
    this.canceled.emit();
  }
}
