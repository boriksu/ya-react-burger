import { getCookie, setCookie } from "../../../data/api/useCookie";
import { AppDispatch, TUser } from "../../../data/types/types";

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
} as const;

type AuthOperation = (typeof AUTH_ACTIONS)[keyof typeof AUTH_ACTIONS];

interface IAuthStartAction {
  type: typeof AUTH_ACTIONS.START;
  meta: {
    operation: AuthOperation;
  };
}

interface IAuthSuccessAction {
  type: typeof AUTH_ACTIONS.SUCCESS;
  payload: {
    user?: TUser;
    accessToken?: string;
    refreshToken?: string;
  };
  meta: {
    operation: AuthOperation;
  };
}

interface IAuthErrorAction {
  type: typeof AUTH_ACTIONS.ERROR;
  payload: string;
  meta?: {
    operation: AuthOperation;
  };
}

interface IAuthClearErrorsAction {
  type: typeof AUTH_ACTIONS.CLEAR_ERRORS;
}

export type TAuthActions =
  | IAuthStartAction
  | IAuthSuccessAction
  | IAuthErrorAction
  | IAuthClearErrorsAction;

interface ApiResponse {
  success: boolean;
  message?: string;
  user?: TUser;
  accessToken?: string;
  refreshToken?: string;
  [key: string]: any;
}

type ApiCallFunction = (data?: any) => Promise<ApiResponse>;

const handleTokens = (result: ApiResponse): ApiResponse => {
  if (result.accessToken) {
    const accessToken = result.accessToken.split("Bearer ")[1];
    const refreshToken = result.refreshToken;

    if (accessToken && refreshToken) {
      setCookie("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
  }
  return result;
};

export const createAuthAction =
  (apiCall: ApiCallFunction, actionType: AuthOperation, tokenHandler = false) =>
  (data = {}) =>
  async (dispatch: AppDispatch) => {
    try {
      if (
        actionType === AUTH_ACTIONS.GET_USER ||
        actionType === AUTH_ACTIONS.PATCH_USER
      ) {
        const accessToken = getCookie("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
          return;
        }

        if (accessToken.length < 10 || refreshToken.length < 10) {
          localStorage.removeItem("refreshToken");
          document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          return;
        }
      }

      dispatch({
        type: AUTH_ACTIONS.START,
        meta: { operation: actionType },
      } as IAuthStartAction);

      const result = await apiCall(data);

      if (!result.success) {
        dispatch({
          type: AUTH_ACTIONS.ERROR,
          payload: result.message,
          meta: { operation: actionType },
        } as IAuthErrorAction);
        return;
      }

      const processedResult = tokenHandler ? handleTokens(result) : result;

      dispatch({
        type: AUTH_ACTIONS.SUCCESS,
        payload: processedResult,
        meta: { operation: actionType },
      } as IAuthSuccessAction);

      return processedResult;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Неизвестная ошибка";

      if (
        errorMessage.includes("jwt") ||
        errorMessage.includes("token") ||
        errorMessage.includes("403")
      ) {
        localStorage.removeItem("refreshToken");
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }

      dispatch({
        type: AUTH_ACTIONS.ERROR,
        payload: errorMessage,
        meta: { operation: actionType },
      } as IAuthErrorAction);

      throw errorMessage;
    }
  };
