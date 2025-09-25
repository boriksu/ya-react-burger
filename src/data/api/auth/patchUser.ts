import { getCookie } from "../useCookie";

import { TPatchUser } from "../../types/types";
import { API_USER, DOMAIN, requestWithRefresh } from "../api-data";

export const patchUser = (user: TPatchUser) => {
  return requestWithRefresh(`${DOMAIN}${API_USER}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ ...user }),
  });
};
