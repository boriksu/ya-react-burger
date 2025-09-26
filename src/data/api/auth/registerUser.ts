import { API_REGISTER, DOMAIN, request } from "../api-data";

import { TRegisterUser } from "../../types/types";

export const registerUser = (user: TRegisterUser) => {
  return request(`${DOMAIN}${API_REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...user }),
  });
};
