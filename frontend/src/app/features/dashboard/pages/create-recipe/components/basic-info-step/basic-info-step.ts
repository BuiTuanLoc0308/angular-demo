import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeCreateStateService } from '../../../../../../core/services/recipes/recipe-create-state.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { MatChipsModule } from '@angular/material/chips';
import { RecipesQueryService } from '../../../../../../core/services/recipes/recipes-query.service';

@Component({
  selector: 'app-basic-info-step',
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe, MatChipsModule],
  templateUrl: './basic-info-step.html',
  styleUrl: './basic-info-step.scss',
})
export class BasicInfoStep implements OnInit {
  private recipeState = inject(RecipeCreateStateService);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);
  private queryService = inject(RecipesQueryService);

  readonly categories = this.queryService.categories.filter((c) => c !== 'ALL');

  form: FormGroup;

  imageFile: File | null = null;
  imagePreview: string | null = null;
  imageError: string | null = null;

  constructor() {
    const recipe = this.recipeState.getRecipe();

    this.form = this.fb.group({
      recipeName: [recipe.recipeName, Validators.required],
      description: [recipe.description, Validators.required],
      categories: [recipe.categories ?? [], Validators.required],
    });

    this.imageFile = this.recipeState.getImageFile();
  }

  get recipeName() {
    return this.form.get('recipeName');
  }

  get description() {
    return this.form.get('description');
  }

  get categoriesControl() {
    return this.form.get('categories');
  }

  get recipeNameInvalid(): boolean {
    return !!(this.recipeName?.invalid && this.recipeName?.touched);
  }

  get descriptionInvalid(): boolean {
    return !!(this.description?.invalid && this.description?.touched);
  }

  get categoriesInvalid(): boolean {
    return !!(this.categoriesControl?.invalid && this.categoriesControl?.touched);
  }

  ngOnInit() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.recipeState.updateRecipe(value);
    });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.imageError = null;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    // Kiểm tra loại file
    if (!allowedTypes.includes(file.type)) {
      this.imageError = this.translate.instant('ERRORS.IMAGE_FILE');
      this.imageFile = null;
      this.imagePreview = null;

      input.value = '';

      return;
    }

    // Kiểm tra dung lượng
    if (file.size > maxSize) {
      this.imageError = this.translate.instant('ERRORS.IMAGE_SIZE');
      this.imageFile = null;
      this.imagePreview = null;

      input.value = '';

      return;
    }

    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }

    // File hợp lệ
    this.imageFile = file;
    this.recipeState.setImageFile(file);

    this.imagePreview = URL.createObjectURL(file);
  }

  removeImage() {
    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }

    this.imageFile = null;
    this.imagePreview = null;
    this.imageError = null;

    this.recipeState.setImageFile(null);
  }
}
