import { IngredientModel } from './ingredient.model';
import { InstructionModel } from './instruction.model';

export interface RecipeModel {
  id: string;

  recipeName: string;
  image: string;
  description: string;
  category: string;

  ingredients: IngredientModel[];
  instructions: InstructionModel[];
}
