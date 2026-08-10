import { environment } from '../../environments/environment';

export const api_endpoint = {
  auth: {
    login: `${environment.apiUrl}/auth/login`,

    register: `${environment.apiUrl}/auth/register`,
  },

  recipes: {
    recipe: `${environment.apiUrl}/recipe`,

    recipeDetail: (id: string) => `${environment.apiUrl}/recipe/${id}`,
  },
};
