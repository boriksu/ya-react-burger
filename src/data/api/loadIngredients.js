import { API_LOAD, DOMAIN, request } from "./api-data";

export const loadIngredients = () => {
  return request(`${DOMAIN}${API_LOAD}`);
};
