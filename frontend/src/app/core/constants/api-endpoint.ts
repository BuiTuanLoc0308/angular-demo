import { environment } from '../../environments/environments';

export const api_endpoint = {
  auth: {
    login: `${environment.apiUrl}/auth/login`,

    register: `${environment.apiUrl}/auth/register`,
  },

  recipe: {
    myRecipe: `${environment.apiUrl}/my-recipe`,

    recipeDetail: (id: string) => `${environment.apiUrl}/my-recipe/${id}`,
  },
};
