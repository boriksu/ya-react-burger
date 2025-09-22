import { API_RESET_PASSWORD, DOMAIN, request } from "../api-data";

export const resetPassword = (form) => {
  return request(`${DOMAIN}${API_RESET_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...form }),
  });
};
