import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  imports: [],
  standalone: true,
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.scss',
})
export class CategoryFilter {
  @Input() categories: string[] = [];

  @Input() selectedCategory = '';

  @Output() categoryChange = new EventEmitter<string>();

  selectCategory(category: string) {
    this.categoryChange.emit(category);
  }
}
