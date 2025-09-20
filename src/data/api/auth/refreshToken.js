import { API_TOKEN, DOMAIN, request } from "../api-data";

export const refreshToken = () => {
  console.log("refreshToken");
  return request(`${DOMAIN}${API_TOKEN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};
