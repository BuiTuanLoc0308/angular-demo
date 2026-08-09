import { environment } from '../../environments/environment';

export const api_endpoint = {
  auth: {
    login: `${environment.apiUrl}/auth/login`,

    register: `${environment.apiUrl}/auth/register`,
  },

  recipe: {
    myRecipe: `${environment.apiUrl}/recipe`,

    recipeDetail: (id: string) => `${environment.apiUrl}/recipe/${id}`,
  },
};
