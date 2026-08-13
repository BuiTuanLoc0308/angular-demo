import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Location, AsyncPipe } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { BasicInfoStep } from './components/basic-info-step/basic-info-step';
import { IngredientsStep } from './components/ingredients-step/ingredients-step';
import { InstructionsStep } from './components/instructions-step/instructions-step';
import { ReviewStep } from './components/review-step/review-step';
import { RecipeCreateStateService } from '../../../../core/services/recipes/recipe-create-state.service';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { RecipeEditorService } from '../../../../core/services/recipes/recipe-editor.service';

@Component({
  selector: 'app-create-recipe',
  imports: [
    MatIconModule,
    MatStepperModule,
    BasicInfoStep,
    IngredientsStep,
    InstructionsStep,
    ReviewStep,
    AsyncPipe,
    TranslatePipe,
  ],
  standalone: true,
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRecipe implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private location = inject(Location);
  private recipeState = inject(RecipeCreateStateService);
  private route = inject(ActivatedRoute);
  private pageState = inject(RecipeEditorService);

  isMobile$ = this.breakpointObserver.observe('(max-width: 768px)').pipe(
    map((result) => result.matches),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  get isEdit() {
    return this.pageState.isEdit();
  }

  get isProcess() {
    return this.pageState.isProcess();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.pageState.initializeFromRouteParam(id);
  }

  goBack() {
    this.location.back();
  }

  submitRecipe() {
    const recipe = this.recipeState.getRecipe();
    const imageFile = this.recipeState.getImageFile();

    this.pageState.submitRecipe(recipe, imageFile);
  }
}
