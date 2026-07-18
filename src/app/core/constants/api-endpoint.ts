import { environment } from '../../environments/environments';

export const api_endpoint = {
  auth: {
    login: `${environment.apiUrl}/login`,

    register: `${environment.apiUrl}/register`,
  },

  recipe: {
    myRecipe: `${environment.apiUrl}/my-recipe`,

    recipeDetail: (id: string) => `${environment.apiUrl}/my-recipe/${id}`,
  },
};
