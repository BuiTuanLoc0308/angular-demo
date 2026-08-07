import { CategoryModel } from './category.model';
import { IngredientModel } from './ingredient.model';
import { InstructionModel } from './instruction.model';
import { ReviewModel } from './review.model';

export interface RecipeModel {
  id: string;

  recipeName: string;
  image: string;
  description: string;

  categories: CategoryModel[];

  ingredients: IngredientModel[];

  instructions: InstructionModel[];

  reviews: ReviewModel[];
}
