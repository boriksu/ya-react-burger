import { TLoginUser } from "../../types/types";
import { API_LOGIN, DOMAIN, request } from "../api-data";

export const loginUser = (user: TLoginUser) => {
  return request(`${DOMAIN}${API_LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...user }),
  });
};
