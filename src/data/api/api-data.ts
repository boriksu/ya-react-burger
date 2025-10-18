import { refreshToken } from "./auth/refreshToken";
import { setCookie } from "./useCookie";

export const WS_URL = "wss://norma.nomoreparties.space";
export const DOMAIN = "https://norma.nomoreparties.space";
export const API_LOAD = "/api/ingredients";
export const API_ORDER = "/api/orders";
export const API_LOGIN = "/api/auth/login";
export const API_REGISTER = "/api/auth/register";
export const API_LOGOUT = "/api/auth/logout";
export const API_TOKEN = "/api/auth/token";
export const API_USER = "/api/auth/user";
export const API_FORGOT_PASSWORD = "/api/password-reset";
export const API_RESET_PASSWORD = "/api/password-reset/reset";

export const request = (url: string, options?: RequestInit) => {
  return fetch(url, options).then(checkResponse);
};

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const requestWithRefresh = (url: string, options: RequestInit) => {
  return request(url, options).catch((err) => {
    if (err.message === "jwt expired") {
      return refreshToken().then((refreshData) => {
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }

        const accessToken = refreshData.accessToken.split("Bearer ")[1];
        const refreshTokenValue = refreshData.refreshToken;

        if (accessToken) {
          setCookie("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshTokenValue);
        }

        const headers = new Headers(options.headers);
        headers.set("Authorization", refreshData.accessToken);

        return request(url, {
          ...options,
          headers: headers,
        });
      });
    } else {
      return Promise.reject(err);
    }
  });
};
