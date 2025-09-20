import { setCookie, getCookie } from "../../../data/api/useCookie";

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
  (data = {}) =>
  async (dispatch) => {
    try {
      // 🔥 ДОБАВЬТЕ ЭТУ ПРОВЕРКУ ДО dispatch(START)
      if (
        actionType === AUTH_ACTIONS.GET_USER ||
        actionType === AUTH_ACTIONS.PATCH_USER
      ) {
        const accessToken = getCookie("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
          console.log(
            "🚫 Blocked auth check: no tokens available for",
            actionType
          );
          return; // ← ПРЕРЫВАЕМ ВЫПОЛНЕНИЕ!
        }

        // Дополнительная проверка валидности
        if (accessToken.length < 10 || refreshToken.length < 10) {
          console.log("🚫 Blocked auth check: invalid tokens for", actionType);
          // Очищаем поврежденные токены
          localStorage.removeItem("refreshToken");
          document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          return;
        }
      }

      dispatch({
        type: AUTH_ACTIONS.START,
        meta: { operation: actionType },
      });

      const result = await apiCall(data);

      if (!result.success) {
        throw new Error(result.message || "Operation failed");
      }

      const processedResult = tokenHandler ? handleTokens(result) : result;

      dispatch({
        type: AUTH_ACTIONS.SUCCESS,
        payload: processedResult,
        meta: { operation: actionType },
      });

      return processedResult;
    } catch (error) {
      const errorMessage =
        error?.message || error?.toString() || "Неизвестная ошибка";

      // 🔥 АВТООЧИСТКА ПРИ ОШИБКАХ АУТЕНТИКАЦИИ
      if (
        errorMessage.includes("jwt") ||
        errorMessage.includes("token") ||
        errorMessage.includes("403")
      ) {
        console.log("🧹 Auto-clearing tokens due to auth error");
        localStorage.removeItem("refreshToken");
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }

      dispatch({
        type: AUTH_ACTIONS.ERROR,
        payload: errorMessage,
        meta: { operation: actionType },
      });

      throw errorMessage;
    }
  };
