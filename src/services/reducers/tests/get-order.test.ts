import { TOrder } from "../../../data/types/types";
import { GET_ORDER_ACTIONS } from "../../actions/get-order";
import { getOrderReducer } from "../get-order";

// Моки для тестовых данных
const mockOrder: TOrder = {
  _id: "1",
  ingredients: ["bun", "sauce", "bun"],
  status: "done",
  name: "Test Order",
  createdAt: "2025-10-22T00:00:00.000Z",
  updatedAt: "2025-10-22T00:00:00.000Z",
  number: 1,
};

const mockOrder2: TOrder = {
  _id: "2",
  ingredients: ["bun", "meat", "bun"],
  status: "done",
  name: "Test Order2",
  createdAt: "2025-10-22T00:05:00.000Z",
  updatedAt: "2025-10-22T00:05:00.000Z",
  number: 2,
};

describe("getOrderReducer", () => {
  const initialState = {
    requestStart: false,
    requestError: null,
    order: null,
  };

  describe("initial state", () => {
    it("should return initial state when no state provided", () => {
      expect(getOrderReducer(undefined, {} as any)).toEqual(initialState);
    });

    it("should return current state for unknown action", () => {
      const currentState = {
        requestStart: true,
        requestError: null,
        order: mockOrder,
      };
      const action = { type: "UNKNOWN_ACTION" };

      expect(getOrderReducer(currentState, action as any)).toEqual(
        currentState
      );
    });
  });

  // 2. Тестирование действия START
  describe("START", () => {
    it("should handle START action from initial state", () => {
      const action = { type: GET_ORDER_ACTIONS.START };

      const result = getOrderReducer(initialState, action);

      expect(result).toEqual({
        requestStart: true,
        requestError: null,
        order: null,
      });
    });

    it("should clear existing error and set requestStart to true", () => {
      const stateWithError = {
        requestStart: false,
        requestError: "Previous error",
        order: null,
      };
      const action = { type: GET_ORDER_ACTIONS.START };

      const result = getOrderReducer(stateWithError, action);

      expect(result.requestStart).toBe(true);
      expect(result.requestError).toBeNull();
    });

    it("should preserve existing order when starting new request", () => {
      const stateWithOrder = {
        requestStart: false,
        requestError: null,
        order: mockOrder,
      };
      const action = { type: GET_ORDER_ACTIONS.START };

      const result = getOrderReducer(stateWithOrder, action);

      expect(result.order).toEqual(mockOrder);
    });
  });

  describe("SUCCESS", () => {
    it("should handle SUCCESS action with order data", () => {
      const action = {
        type: GET_ORDER_ACTIONS.SUCCESS,
        order: mockOrder,
      };

      const result = getOrderReducer(initialState, action);

      expect(result).toEqual({
        requestStart: false,
        requestError: null,
        order: mockOrder,
      });
    });

    it("should reset loading state and clear errors on success", () => {
      const action = {
        type: GET_ORDER_ACTIONS.SUCCESS,
        order: mockOrder,
      };
      const loadingState = {
        requestStart: true,
        requestError: null,
        order: null,
      };

      const result = getOrderReducer(loadingState, action);

      expect(result.requestStart).toBe(false);
      expect(result.requestError).toBeNull();
    });

    it("should replace existing order with new order data", () => {
      const action = {
        type: GET_ORDER_ACTIONS.SUCCESS,
        order: mockOrder2,
      };
      const stateWithOldOrder = {
        requestStart: true,
        requestError: null,
        order: mockOrder,
      };

      const result = getOrderReducer(stateWithOldOrder, action);

      expect(result.order).toEqual(mockOrder2);
      expect(result.order).not.toEqual(mockOrder);
    });

    it("should clear error when successfully loading order", () => {
      const action = {
        type: GET_ORDER_ACTIONS.SUCCESS,
        order: mockOrder,
      };
      const stateWithError = {
        requestStart: true,
        requestError: "Loading failed",
        order: null,
      };

      const result = getOrderReducer(stateWithError, action);

      expect(result.requestError).toBeNull();
    });
  });

  describe("ERROR", () => {
    it("should handle ERROR action with error message", () => {
      const errorMessage = "Order not found";
      const action = {
        type: GET_ORDER_ACTIONS.ERROR,
        message: errorMessage,
      };

      const result = getOrderReducer(initialState, action);

      expect(result).toEqual({
        requestStart: false,
        requestError: errorMessage,
        order: null,
      });
    });

    it("should set error message and reset loading state on failure", () => {
      const errorMessage = "Network error";
      const action = {
        type: GET_ORDER_ACTIONS.ERROR,
        message: errorMessage,
      };
      const loadingState = {
        requestStart: true,
        requestError: null,
        order: mockOrder,
      };

      const result = getOrderReducer(loadingState, action);

      expect(result.requestStart).toBe(false);
      expect(result.requestError).toBe(errorMessage);
    });

    it("should clear existing order when error occurs", () => {
      const action = {
        type: GET_ORDER_ACTIONS.ERROR,
        message: "Error message",
      };
      const stateWithOrder = {
        requestStart: true,
        requestError: null,
        order: mockOrder,
      };

      const result = getOrderReducer(stateWithOrder, action);

      expect(result.order).toBeNull();
    });
  });
});
