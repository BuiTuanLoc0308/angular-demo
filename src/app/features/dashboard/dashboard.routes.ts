import { Routes } from '@angular/router';
import { MyRecipes } from './pages/my-recipes/my-recipes';
import { CookingActivity } from './pages/cooking-activity/cooking-activity';
import { MealPlanner } from './pages/meal-planner/meal-planner';
import { AccountSettings } from './pages/account-settings/account-settings';
import { CreateRecipe } from './pages/create-recipe/create-recipe';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';
import { recipeDetailResolver } from '../../core/resolver/recipe-detail.resolver';

export const dashboardRoutes: Routes = [
  {
    path: 'my-recipes',
    component: MyRecipes,
  },
  {
    path: 'cooking-activity',
    component: CookingActivity,
  },
  {
    path: 'meal-planner',
    component: MealPlanner,
  },
  {
    path: 'account-settings',
    component: AccountSettings,
  },
  {
    path: 'create-recipe',
    component: CreateRecipe,
  },
  {
    path: 'my-recipes/:id',
    component: RecipeDetail,
    resolve: {
      recipe: recipeDetailResolver,
    },
  },
  {
    path: 'create-recipe/:id',
    component: CreateRecipe,
  },
];
