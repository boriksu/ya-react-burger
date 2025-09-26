import { TForgotPassword } from "../../types/types";
import { API_FORGOT_PASSWORD, DOMAIN, request } from "../api-data";

export const forgotPassword = (form: TForgotPassword) => {
  return request(`${DOMAIN}${API_FORGOT_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...form }),
  });
};
