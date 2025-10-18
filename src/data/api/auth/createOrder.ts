import { TIngredient } from "../../types/types";
import { API_ORDER, DOMAIN, requestWithRefresh } from "../api-data";
import { getCookie } from "../useCookie";

export const createOrder = (ingredients: Array<TIngredient>) => {
  return requestWithRefresh(`${DOMAIN}${API_ORDER}`, {
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
