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
  AUTH_ACTIONS.REGISTER,
  true
);
export const authLoginAction = createAuthAction(
  loginUser,
  AUTH_ACTIONS.LOGIN,
  true
);
export const authLogoutAction = (data) => async (dispatch) => {
  console.log("authLogoutAction");
  try {
    dispatch({
      type: AUTH_ACTIONS.START,
      meta: { operation: AUTH_ACTIONS.LOGOUT },
    });

    // Сначала очищаем токены
    localStorage.removeItem("refreshToken");
    deleteCookie("accessToken");

    // Затем делаем запрос на сервер
    await logoutUser(data);

    dispatch({
      type: AUTH_ACTIONS.SUCCESS,
      meta: { operation: AUTH_ACTIONS.LOGOUT },
    });
  } catch (error) {
    dispatch({
      type: AUTH_ACTIONS.ERROR,
      payload: error.message,
      meta: { operation: AUTH_ACTIONS.LOGOUT },
    });
    throw error;
  }
};

export const authTokenAction = createAuthAction(
  refreshToken,
  AUTH_ACTIONS.TOKEN,
  true
);
export const authForgotPasswordAction = createAuthAction(
  forgotPassword,
  AUTH_ACTIONS.FORGOT_PASSWORD
);
export const authResetPasswordAction = createAuthAction(
  resetPassword,
  AUTH_ACTIONS.RESET_PASSWORD
);
export const authGetUserAction = createAuthAction(
  getUser,
  AUTH_ACTIONS.GET_USER
);
export const authPatchUserAction = createAuthAction(
  patchUser,
  AUTH_ACTIONS.PATCH_USER
);

export const clearAuthErrors = () => ({
  type: AUTH_ACTIONS.CLEAR_ERRORS,
});
