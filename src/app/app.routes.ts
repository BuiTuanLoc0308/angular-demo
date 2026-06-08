import { Routes } from '@angular/router';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { MyRecipes } from './features/dashboard/pages/my-recipes/my-recipes';
import { CookingActivity } from './features/dashboard/pages/cooking-activity/cooking-activity';
import { MealPlanner } from './features/dashboard/pages/meal-planner/meal-planner';
import { AccountSettings } from './features/dashboard/pages/account-settings/account-settings';
import { AuthLogin } from './features/auth/pages/auth-login/auth-login';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,

    children: [
      {
        path: '',
        redirectTo: 'cooking-activity',
        pathMatch: 'full',
      },

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
        path: 'login',
        component: AuthLogin,
      },
    ],
  },
];
