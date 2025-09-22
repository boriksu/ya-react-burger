import { getCookie } from "../useCookie";

import { API_USER, DOMAIN, requestWithRefresh } from "../api-data";

export const getUser = () => {
  return requestWithRefresh(`${DOMAIN}${API_USER}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });
};
