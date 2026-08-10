import { RecipeModel } from './recipe.model';

export interface RecipeResponse {
  recipes: RecipeModel[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}
