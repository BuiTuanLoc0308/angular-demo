import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.scss',
})
export class CategoryFilter {
  readonly categories = input<string[]>([]);

  readonly selectedCategory = input('');

  readonly categoryChange = output<string>();

  selectCategory(category: string): void {
    this.categoryChange.emit(category);
  }
}
