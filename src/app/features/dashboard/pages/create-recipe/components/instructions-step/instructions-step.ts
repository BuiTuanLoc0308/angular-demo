import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeCreateStateService } from '../../../../../../core/services/recipe-create-state.service';
import { InstructionModel } from '../../../../../../core/models/instruction.model';

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

    if (recipe.instructions.length > 0) {
      recipe.instructions.forEach((instruction) => {
        this.instructions.push(this.createInstruction(instruction));
      });
    } else {
      this.instructions.push(this.createInstruction());
    }
  }

  addInstruction() {
    this.instructions.push(this.createInstruction());
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);

    if (this.instructions.length === 0) {
      this.addInstruction();
    }
  }

  ngOnInit() {
    this.initInstructions();

    this.form.valueChanges.subscribe((value) => {
      this.recipeState.updateRecipe({
        instructions: (value.instructions ?? []) as InstructionModel[],
      });

      console.log('Instructions:', value.instructions);
      console.log('Recipe State:', this.recipeState.recipe);
    });
  }
}
