import { AUTH_ACTIONS, TAuthActions } from "../../actions/auth/auth-helper";
import { authReducer } from "../auth";

describe("authReducer", () => {
  const initialState = {
    authLoading: false,
    authError: null,
    authSuccess: false,
    authLogIn: false,
    forgotPassword: false,
    user: null,
  };

  const mockUser = {
    email: "test@test.com",
    name: "Test User",
  };

  it("should return initial state when no state provided", () => {
    expect(authReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should return current state for unknown action", () => {
    const currentState = {
      authLoading: true,
      authError: null,
      authSuccess: false,
      authLogIn: true,
      forgotPassword: false,
      user: mockUser,
    };
    const action = { type: "UNKNOWN_ACTION" };

    expect(authReducer(currentState, action as any)).toEqual(currentState);
  });

  describe("START", () => {
    it("should handle START with FORGOT_PASSWORD operation", () => {
      const action = {
        type: AUTH_ACTIONS.START,
        meta: { operation: AUTH_ACTIONS.FORGOT_PASSWORD },
      };

      const result = authReducer(initialState, action);

      expect(result.forgotPassword).toBe(false);
    });

    it("should handle START with GET_USER operation", () => {
      const stateWithUser = { ...initialState, user: mockUser };
      const action = {
        type: AUTH_ACTIONS.START,
        meta: { operation: AUTH_ACTIONS.GET_USER },
      };

      const result = authReducer(stateWithUser, action);

      expect(result.user).toBeNull();
    });
  });

  describe("SUCCESS", () => {
    it("should handle SUCCESS with LOGIN operation", () => {
      const action = {
        type: AUTH_ACTIONS.SUCCESS,
        meta: { operation: AUTH_ACTIONS.LOGIN },
        payload: { user: mockUser },
      };

      const result = authReducer(initialState, action);

      expect(result.authLogIn).toBe(true);
      expect(result.user).toEqual(mockUser);
      expect(result.authLoading).toBe(false);
    });

    it("should handle SUCCESS with LOGOUT operation", () => {
      const stateLoggedIn = {
        ...initialState,
        authLogIn: true,
        user: mockUser,
      };
      const action = {
        type: AUTH_ACTIONS.SUCCESS,
        meta: { operation: AUTH_ACTIONS.LOGOUT },
      };

      const result = authReducer(stateLoggedIn, action as TAuthActions);

      expect(result.authLogIn).toBe(false);
      expect(result.user).toBeNull();
    });

    it("should handle SUCCESS with FORGOT_PASSWORD operation", () => {
      const action = {
        type: AUTH_ACTIONS.SUCCESS,
        meta: { operation: AUTH_ACTIONS.FORGOT_PASSWORD },
      };

      const result = authReducer(initialState, action as TAuthActions);

      expect(result.forgotPassword).toBe(true);
    });

    it("should handle SUCCESS with GET_USER operation", () => {
      const action = {
        type: AUTH_ACTIONS.SUCCESS,
        meta: { operation: AUTH_ACTIONS.GET_USER },
        payload: { user: mockUser },
      };

      const result = authReducer(initialState, action);

      expect(result.authLogIn).toBe(true);
      expect(result.user).toEqual(mockUser);
    });

    it("should handle SUCCESS with PATCH_USER operation", () => {
      const updatedUser = { ...mockUser, name: "Updated User" };
      const action = {
        type: AUTH_ACTIONS.SUCCESS,
        meta: { operation: AUTH_ACTIONS.PATCH_USER },
        payload: { user: updatedUser },
      };

      const result = authReducer(initialState, action);

      expect(result.user).toEqual(updatedUser);
    });
  });

  describe("ERROR", () => {
    it("should handle ERROR with LOGIN operation", () => {
      const action = {
        type: AUTH_ACTIONS.ERROR,
        meta: { operation: AUTH_ACTIONS.LOGIN },
        payload: "Login failed",
      };

      const result = authReducer(initialState, action);

      expect(result.authError).toBe("Login failed");
      expect(result.authLogIn).toBe(false);
      expect(result.user).toBeNull();
    });

    it("should handle ERROR with GET_USER operation", () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser,
        authLogIn: true,
      };
      const action = {
        type: AUTH_ACTIONS.ERROR,
        meta: { operation: AUTH_ACTIONS.GET_USER },
        payload: "Get user failed",
      };

      const result = authReducer(stateWithUser, action);

      expect(result.authLogIn).toBe(false);
      expect(result.user).toBeNull();
    });

    it("should handle ERROR with FORGOT_PASSWORD operation", () => {
      const action = {
        type: AUTH_ACTIONS.ERROR,
        meta: { operation: AUTH_ACTIONS.FORGOT_PASSWORD },
        payload: "Forgot password failed",
      };

      const result = authReducer(initialState, action);

      expect(result.forgotPassword).toBe(false);
    });
  });

  describe("CLEAR_ERRORS", () => {
    it("should handle CLEAR_ERRORS action", () => {
      const stateWithError = {
        authLoading: true,
        authError: "Some error",
        authSuccess: true,
        authLogIn: true,
        forgotPassword: false,
        user: mockUser,
      };
      const action = { type: AUTH_ACTIONS.CLEAR_ERRORS };

      const result = authReducer(stateWithError, action);

      expect(result.authLoading).toBe(false);
      expect(result.authError).toBeNull();
      expect(result.authSuccess).toBe(false);
    });
  });
});
