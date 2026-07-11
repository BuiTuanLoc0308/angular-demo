import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RecipeFormUtilsService {
  private fb = inject(FormBuilder);

  createDynamicGroup(fields: Record<string, unknown>): FormGroup {
    return this.fb.group(fields);
  }

  initializeArrayItems<T>(
    formArray: FormArray,
    items: T[],
    createItem: (item?: T) => FormGroup,
    emptyItemFactory: () => FormGroup,
  ): void {
    if (items.length > 0) {
      items.forEach((item) => formArray.push(createItem(item)));
      return;
    }

    formArray.push(emptyItemFactory());
  }

  ensureMinimumItem(formArray: FormArray, createItem: () => FormGroup): void {
    if (formArray.length === 0) {
      formArray.push(createItem());
    }
  }
}
