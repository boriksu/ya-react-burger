import { API_REGISTER, DOMAIN, request } from "../api-data";

export const registerUser = (user) => {
  return request(`${DOMAIN}${API_REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...user }),
  });
};
