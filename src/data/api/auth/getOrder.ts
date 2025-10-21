import { API_ORDER, DOMAIN, request } from "../api-data";

export const getOrder = (orderNum?: string) => {
  return request(`${DOMAIN}${API_ORDER}/${orderNum}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
};
