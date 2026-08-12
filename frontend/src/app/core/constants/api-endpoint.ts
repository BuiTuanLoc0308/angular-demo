import { environment } from '../../environments/environment';

export const api_endpoint = {
  auth: {
    login: `${environment.apiUrl}/auth/login`,

    refresh: `${environment.apiUrl}/auth/refresh`,

    register: `${environment.apiUrl}/auth/register`,

    logout: `${environment.apiUrl}/auth/logout`,
  },

  recipes: {
    recipe: `${environment.apiUrl}/recipe`,

    recipeDetail: (id: string) => `${environment.apiUrl}/recipe/${id}`,
  },
};
