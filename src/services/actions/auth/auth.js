import {
  forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  patchUser,
  refreshToken,
  registerUser,
  resetPassword,
} from "../../../data/api/auth";
import { deleteCookie } from "../../../data/api/useCookie";

import { AUTH_ACTIONS, createAuthAction } from "./auth-helper";

// // Action types
// export const AUTH_START = "AUTH_START";
// export const AUTH_SUCCESS = "AUTH_SUCCESS";
// export const AUTH_ERROR = "AUTH_ERROR";
// export const AUTH_CLEAR_ERRORS = "AUTH_CLEAR_ERRORS";

// // Specific action types для разных операций
// export const AUTH_REGISTER = "AUTH_REGISTER";
// export const AUTH_LOGIN = "AUTH_LOGIN";
// export const AUTH_LOGOUT = "AUTH_LOGOUT";
// export const AUTH_TOKEN = "AUTH_TOKEN";
// export const AUTH_FORGOT_PASSWORD = "AUTH_FORGOT_PASSWORD";
// export const AUTH_RESET_PASSWORD = "AUTH_RESET_PASSWORD";
// export const AUTH_GET_USER = "AUTH_GET_USER";
// export const AUTH_PATCH_USER = "AUTH_PATCH_USER";

export const authRegisterAction = createAuthAction(
  registerUser,
  AUTH_ACTIONS.AUTH_REGISTER,
  true
);
export const authLoginAction = createAuthAction(
  loginUser,
  AUTH_ACTIONS.AUTH_LOGIN,
  true
);
export const authLogoutAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_ACTIONS.AUTH_START,
      meta: { operation: AUTH_ACTIONS.AUTH_LOGOUT },
    });

    // Сначала очищаем токены
    localStorage.removeItem("refreshToken");
    deleteCookie("accessToken");

    // Затем делаем запрос на сервер
    await logoutUser(data);

    dispatch({
      type: AUTH_ACTIONS.AUTH_SUCCESS,
      meta: { operation: AUTH_ACTIONS.AUTH_LOGOUT },
    });
  } catch (error) {
    dispatch({
      type: AUTH_ACTIONS.AUTH_ERROR,
      payload: error.message,
      meta: { operation: AUTH_ACTIONS.AUTH_LOGOUT },
    });
    throw error;
  }
};

export const authTokenAction = createAuthAction(
  refreshToken,
  AUTH_ACTIONS.AUTH_TOKEN,
  true
);
export const authForgotPasswordAction = createAuthAction(
  forgotPassword,
  AUTH_ACTIONS.AUTH_FORGOT_PASSWORD
);
export const authResetPasswordAction = createAuthAction(
  resetPassword,
  AUTH_ACTIONS.AUTH_RESET_PASSWORD
);
export const authGetUserAction = createAuthAction(
  getUser,
  AUTH_ACTIONS.AUTH_GET_USER
);
export const authPatchUserAction = createAuthAction(
  patchUser,
  AUTH_ACTIONS.AUTH_PATCH_USER
);

export const clearAuthErrors = () => ({
  type: AUTH_ACTIONS.AUTH_CLEAR_ERRORS,
});
