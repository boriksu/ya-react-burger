import { TUser } from "../../data/types/types";
import { AUTH_ACTIONS, TAuthActions } from "../actions/auth/auth-helper";

type TAuthState = {
  authLoading: boolean;
  authError: string | null;
  authSuccess: boolean;
  authLogIn: boolean;
  user: TUser | null;
  forgotPassword: boolean;
};

export const initialState: TAuthState = {
  authLoading: false,
  authError: null,
  authSuccess: false,
  authLogIn: false,
  forgotPassword: false,
  user: null,
};

export const authReducer = (
  state = initialState,
  action: TAuthActions
): TAuthState => {
  const operation = "meta" in action ? action.meta?.operation : undefined;

  switch (action.type) {
    case AUTH_ACTIONS.START:
      const startUpdates: Partial<TAuthState> = {
        authLoading: true,
        authError: null,
        authSuccess: false,
      };

      if (
        operation === AUTH_ACTIONS.FORGOT_PASSWORD ||
        operation === AUTH_ACTIONS.RESET_PASSWORD
      ) {
        startUpdates.forgotPassword = false;
      }
      if (operation === AUTH_ACTIONS.GET_USER) {
        startUpdates.user = initialState.user;
      }

      return { ...state, ...startUpdates };

    case AUTH_ACTIONS.SUCCESS:
      const successUpdates: Partial<TAuthState> = {
        authLoading: false,
        authError: null,
        authSuccess: true,
      };

      switch (operation) {
        case AUTH_ACTIONS.REGISTER:
        case AUTH_ACTIONS.LOGIN:
        case AUTH_ACTIONS.TOKEN:
          successUpdates.authLogIn = true;
          if (action.payload.user) {
            successUpdates.user = action.payload.user;
          }
          break;

        case AUTH_ACTIONS.LOGOUT:
          successUpdates.authLogIn = false;
          successUpdates.user = initialState.user;
          break;

        case AUTH_ACTIONS.FORGOT_PASSWORD:
          successUpdates.forgotPassword = true;
          break;

        case AUTH_ACTIONS.RESET_PASSWORD:
          break;

        case AUTH_ACTIONS.GET_USER:
          if (action.payload.user) {
            successUpdates.user = action.payload.user;
          }
          successUpdates.authLogIn = true;
          break;

        case AUTH_ACTIONS.PATCH_USER:
          if (action.payload.user) {
            successUpdates.user = action.payload.user;
          }
          break;
        default:
      }

      return { ...state, ...successUpdates };

    case AUTH_ACTIONS.ERROR:
      const errorUpdates: Partial<TAuthState> = {
        authLoading: false,
        authError: action.payload,
        authSuccess: false,
      };

      switch (operation) {
        case AUTH_ACTIONS.LOGOUT:
        case AUTH_ACTIONS.GET_USER:
          errorUpdates.authLogIn = false;
          errorUpdates.user = initialState.user;
          break;

        case AUTH_ACTIONS.FORGOT_PASSWORD:
          errorUpdates.forgotPassword = false;
          break;

        case AUTH_ACTIONS.RESET_PASSWORD:
          errorUpdates.forgotPassword = false;
          break;

        case AUTH_ACTIONS.REGISTER:
        case AUTH_ACTIONS.LOGIN:
        case AUTH_ACTIONS.TOKEN:
          errorUpdates.authLogIn = false;
          errorUpdates.user = initialState.user;
          break;
        default:
      }

      return { ...state, ...errorUpdates };

    case AUTH_ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        authLoading: false,
        authError: null,
        authSuccess: false,
      };

    default:
      return state;
  }
};
