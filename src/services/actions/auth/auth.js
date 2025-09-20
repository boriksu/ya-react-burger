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
