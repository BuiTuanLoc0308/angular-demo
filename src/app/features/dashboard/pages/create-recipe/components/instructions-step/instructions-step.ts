import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeCreateStateService } from '../../../../../../core/services/recipe-create-state.service';
import { InstructionModel } from '../../../../../../core/models/instruction.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecipeFormUtilsService } from '../../services/recipe-form-utils.service';

@Component({
  selector: 'app-instructions-step',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './instructions-step.html',
  styleUrl: './instructions-step.scss',
})
export class InstructionsStep implements OnInit {
  private fb = inject(FormBuilder);
  private recipeState = inject(RecipeCreateStateService);
  private destroyRef = inject(DestroyRef);
  private formUtils = inject(RecipeFormUtilsService);

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

  private initInstructions() {
    const recipe = this.recipeState.getRecipe();

    this.formUtils.initializeArrayItems(
      this.instructions,
      recipe.instructions,
      (instruction) => this.createInstruction(instruction),
      () => this.createInstruction(),
    );
  }

  addInstruction() {
    this.instructions.push(this.createInstruction());
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
    this.formUtils.ensureMinimumItem(this.instructions, () => this.createInstruction());
  }

  ngOnInit() {
    this.initInstructions();

    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.recipeState.updateRecipe({
        instructions: (value.instructions ?? []) as InstructionModel[],
      });
    });
  }
}
