// const DOMAIN = "https://norma.nomoreparties.space";

import { API_ORDER, DOMAIN, request } from "./api-data";

export const createOrder = (ingredients) => {
  return request(`${DOMAIN}${API_ORDER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients: ingredients.map((item) => item._id),
    }),
  });
};
