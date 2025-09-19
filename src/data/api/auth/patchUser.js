import { getCookie } from "../useCookie";

import { API_USER, DOMAIN, requestWithRefresh } from "../api-data";

export const patchUser = (user) => {
  return requestWithRefresh(`${DOMAIN}${API_USER}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ ...user }),
  });
};
