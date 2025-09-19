import { refreshToken } from "./auth/refreshToken";
import { setCookie } from "./useCookie";

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

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(res) {
  if (!res.ok) {
    const errorMessage = `HTTP Error: ${res.status} - ${res.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return res.json().then((data) => {
    if (!data.success) {
      throw new Error("Server responded with success: false");
    }

    return data;
  });
}

export function requestWithRefresh(url, options) {
  return fetch(url, options)
    .then(checkResponse)
    .catch((error) => {
      if (error.message !== "jwt expired") {
        return Promise.reject(error);
      }

      return refreshToken().then((tokenData) => {
        if (!tokenData.success) {
          return Promise.reject(tokenData);
        }

        localStorage.setItem("refreshToken", tokenData.refreshToken);
        setCookie("accessToken", tokenData.accessToken);

        const newOptions = {
          ...options,
          headers: {
            ...options.headers,
            authorization: tokenData.accessToken,
          },
        };

        return request(url, newOptions);
      });
    });
}
