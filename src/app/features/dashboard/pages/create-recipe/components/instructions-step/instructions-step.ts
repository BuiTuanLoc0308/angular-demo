import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeCreateStateService } from '../../../../../../core/services/recipe-create-state.service';

@Component({
  selector: 'app-instructions-step',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './instructions-step.html',
  styleUrl: './instructions-step.scss',
})
export class InstructionsStep {
  private fb = inject(FormBuilder);
  private recipeState = inject(RecipeCreateStateService);

  instructionList = this.recipeState.recipe.instructions;

  form = this.fb.group({
    instructions: this.fb.array([this.createInstruction()]),
  });

  get instructions(): FormArray {
    return this.form.get('instructions') as FormArray;
  }

  createInstruction(): FormGroup {
    return this.fb.group({
      content: ['', Validators.required],
    });
  }

  addInstruction() {
    this.instructions.push(this.createInstruction());
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }
}
