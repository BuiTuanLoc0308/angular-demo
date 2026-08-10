import { CategoryModel } from './category.model';
import { IngredientModel } from './ingredient.model';
import { InstructionModel } from './instruction.model';

export interface RecipeRequestModel {
  recipeName: string;
  image: string;
  description: string;

  categories: CategoryModel[];

  ingredients: IngredientModel[];

  instructions: InstructionModel[];
}
