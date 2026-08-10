import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';

import { RecipeCreateStateService } from '../../../../../../core/services/recipes/recipe-create-state.service';
import { InstructionModel } from '../../../../../../core/models/recipes/instruction.model';

@Component({
  selector: 'app-instructions-step',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './instructions-step.html',
  styleUrl: './instructions-step.scss',
})
export class InstructionsStep implements OnInit {
  private fb = inject(FormBuilder);
  private recipeState = inject(RecipeCreateStateService);
  private destroyRef = inject(DestroyRef);

  form = this.fb.group({
    instructions: this.fb.array([]),
  });

  get instructions(): FormArray {
    return this.form.get('instructions') as FormArray;
  }

  createInstruction(instruction?: InstructionModel): FormGroup {
    return this.fb.group({
      content: [instruction?.content ?? '', Validators.required],
    });
  }

  private initInstructions(): void {
    const recipe = this.recipeState.getRecipe();

    if (recipe.instructions.length > 0) {
      recipe.instructions.forEach((instruction) => {
        this.instructions.push(this.createInstruction(instruction));
      });

      return;
    }

    this.instructions.push(this.createInstruction());
  }

  addInstruction(): void {
    this.instructions.push(this.createInstruction());
  }

  removeInstruction(index: number): void {
    this.instructions.removeAt(index);

    if (this.instructions.length === 0) {
      this.instructions.push(this.createInstruction());
    }
  }

  ngOnInit(): void {
    this.initInstructions();

    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.recipeState.updateRecipe({
        instructions: (value.instructions ?? []) as InstructionModel[],
      });
    });
  }
}
