import { API_LOGOUT, DOMAIN, request } from "../api-data";

export const logoutUser = () => {
  return request(`${DOMAIN}${API_LOGOUT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};
