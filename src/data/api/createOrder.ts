import { TIngredient } from "../types/types";
import { API_ORDER, DOMAIN, request } from "./api-data";
import { getCookie } from "./useCookie";

export const createOrder = (ingredients: Array<TIngredient>) => {
  return request(`${DOMAIN}${API_ORDER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: ingredients.map((item) => item._id),
    }),
  });
};
