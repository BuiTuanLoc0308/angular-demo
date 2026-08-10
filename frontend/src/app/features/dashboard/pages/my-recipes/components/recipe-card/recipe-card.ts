import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { RecipeModel } from '../../../../../../core/models/recipes/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink, MatIconModule, TranslatePipe],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
  @Input() recipe!: RecipeModel;
  @Input() isFavorite = false;

  @Output() favoriteToggled = new EventEmitter<string>();

  onFavoriteClick(event: MouseEvent): void {
    event.stopPropagation();

    this.favoriteToggled.emit(this.recipe._id);
  }
}
