import { Routes } from '@angular/router';
// import { recipeDetailResolver } from '../../core/resolver/recipe-detail.resolver';

export const dashboardRoutes: Routes = [
  {
    path: 'my-recipes',
    loadComponent: () => import('./pages/my-recipes/my-recipes').then((m) => m.MyRecipes),
  },

  {
    path: 'cooking-activity',
    loadComponent: () =>
      import('./pages/cooking-activity/cooking-activity').then((m) => m.CookingActivity),
  },

  {
    path: 'meal-planner',
    loadComponent: () => import('./pages/meal-planner/meal-planner').then((m) => m.MealPlanner),
  },

  {
    path: 'account-settings',
    loadComponent: () =>
      import('./pages/account-settings/account-settings').then((m) => m.AccountSettings),
  },

  {
    path: 'create-recipe',
    loadComponent: () => import('./pages/create-recipe/create-recipe').then((m) => m.CreateRecipe),
  },

  {
    path: 'my-recipes/:id',
    loadComponent: () => import('./pages/recipe-detail/recipe-detail').then((m) => m.RecipeDetail),
  },

  {
    path: 'create-recipe/:id',
    loadComponent: () => import('./pages/create-recipe/create-recipe').then((m) => m.CreateRecipe),
  },
];
