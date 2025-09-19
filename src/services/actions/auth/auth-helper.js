import { setCookie } from "../../../data/api/useCookie";

export const AUTH_ACTIONS = {
  START: "AUTH_START",
  SUCCESS: "AUTH_SUCCESS",
  ERROR: "AUTH_ERROR",
  CLEAR_ERRORS: "AUTH_CLEAR_ERRORS",
  REGISTER: "AUTH_REGISTER",
  LOGIN: "AUTH_LOGIN",
  LOGOUT: "AUTH_LOGOUT",
  TOKEN: "AUTH_TOKEN",
  FORGOT_PASSWORD: "AUTH_FORGOT_PASSWORD",
  RESET_PASSWORD: "AUTH_RESET_PASSWORD",
  GET_USER: "AUTH_GET_USER",
  PATCH_USER: "AUTH_PATCH_USER",
};

const handleTokens = (result) => {
  if (result.accessToken) {
    const accessToken = result.accessToken.split("Bearer ")[1];
    const refreshToken = result.refreshToken;

    if (accessToken) {
      setCookie("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
  }
  return result;
};

export const createAuthAction =
  (apiCall, actionType, tokenHandler = false) =>
  (data) =>
  async (dispatch) => {
    try {
      dispatch({
        type: AUTH_ACTIONS.AUTH_START,
        meta: { operation: actionType },
      });

      const result = await apiCall(data);
      const processedResult = tokenHandler ? handleTokens(result) : result;

      dispatch({
        type: AUTH_ACTIONS.AUTH_SUCCESS,
        payload: processedResult,
        meta: { operation: actionType },
      });

      return processedResult;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.AUTH_ERROR,
        payload: error.message,
        meta: { operation: actionType },
      });
      throw error;
    }
  };
