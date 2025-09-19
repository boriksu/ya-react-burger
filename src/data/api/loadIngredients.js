// const DOMAIN = "https://norma.nomoreparties.space";
// const API_LOAD = "/api/ingredients";

import { API_LOAD, DOMAIN, request } from "./api-data";
// const STATUS_OK = 200;

export const loadIngredients = () => {
  return request(`${DOMAIN}${API_LOAD}`);
};
