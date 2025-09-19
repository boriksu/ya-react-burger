// src/services/reducers/auth.js
import { AUTH_ACTIONS } from "../actions/auth/auth-helper";

const initialState = {
  requestStart: false,
  requestError: null,
  requestSuccess: false,
  userLoggedIn: false,
  user: {
    name: "",
    email: "",
  },
  forgotPassword: false,
};

export function authReducer(state = initialState, action) {
  const operation = action.meta?.operation;

  switch (action.type) {
    case AUTH_ACTIONS.AUTH_START:
      const startUpdates = {
        requestStart: true,
        requestError: null,
        requestSuccess: false,
      };

      // Специфичные сбросы для разных операций
      if (operation === AUTH_ACTIONS.AUTH_FORGOT_PASSWORD) {
        startUpdates.forgotPassword = false;
      }
      if (operation === AUTH_ACTIONS.AUTH_GET_USER) {
        startUpdates.user = initialState.user;
      }

      return { ...state, ...startUpdates };

    case AUTH_ACTIONS.AUTH_SUCCESS:
      const successUpdates = {
        requestStart: false,
        requestError: null,
        requestSuccess: true,
      };

      // Специфичная логика для разных операций
      switch (operation) {
        case AUTH_ACTIONS.AUTH_REGISTER:
        case AUTH_ACTIONS.AUTH_LOGIN:
        case AUTH_ACTIONS.AUTH_TOKEN:
          successUpdates.userLoggedIn = true;
          if (action.payload.user) {
            successUpdates.user = action.payload.user;
          }
          break;

        case AUTH_ACTIONS.AUTH_LOGOUT:
          successUpdates.userLoggedIn = false;
          successUpdates.user = initialState.user;
          break;

        case AUTH_ACTIONS.AUTH_FORGOT_PASSWORD:
          successUpdates.forgotPassword = true;
          break;

        case AUTH_ACTIONS.AUTH_GET_USER:
          if (action.payload.user) {
            successUpdates.user = action.payload.user;
          }
          successUpdates.userLoggedIn = true;
          break;

        case AUTH_ACTIONS.AUTH_PATCH_USER:
          if (action.payload.user) {
            successUpdates.user = action.payload.user;
          }
          break;
        default:
      }

      return { ...state, ...successUpdates };

    case AUTH_ACTIONS.AUTH_ERROR:
      const errorUpdates = {
        requestStart: false,
        requestError: action.payload,
        requestSuccess: false,
      };

      // Специфичная логика для ошибок
      switch (operation) {
        case AUTH_ACTIONS.AUTH_LOGOUT:
        case AUTH_ACTIONS.AUTH_GET_USER:
          errorUpdates.userLoggedIn = false;
          errorUpdates.user = initialState.user;
          break;

        case AUTH_ACTIONS.AUTH_FORGOT_PASSWORD:
          errorUpdates.forgotPassword = false;
          break;

        case AUTH_ACTIONS.AUTH_REGISTER:
        case AUTH_ACTIONS.AUTH_LOGIN:
        case AUTH_ACTIONS.AUTH_TOKEN:
          errorUpdates.userLoggedIn = false;
          errorUpdates.user = initialState.user;
          break;
        default:
      }

      return { ...state, ...errorUpdates };

    case AUTH_ACTIONS.AUTH_CLEAR_ERRORS:
      return {
        ...state,
        requestStart: false,
        requestError: null,
        requestSuccess: false,
      };

    default:
      return state;
  }
}
