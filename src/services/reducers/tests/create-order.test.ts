import { ORDER_ACTIONS } from "../../actions/order-action";
import { createOrderReducer } from "../create-order";

describe("createOrderReducer", () => {
  const initialState = {
    orderLoading: false,
    orderErrors: false,
    orderNumber: null,
  };

  describe("initial state", () => {
    it("should return initial state when no state provided", () => {
      expect(createOrderReducer(undefined, {} as any)).toEqual(initialState);
    });

    it("should return current state for unknown action", () => {
      const currentState = {
        orderLoading: true,
        orderErrors: false,
        orderNumber: 12345,
      };
      const action = { type: "UNKNOWN_ACTION" };

      expect(createOrderReducer(currentState, action as any)).toEqual(
        currentState
      );
    });
  });

  describe("CREATE_REQUEST", () => {
    it("should handle CREATE_REQUEST action from initial state", () => {
      const action = { type: ORDER_ACTIONS.CREATE_REQUEST };

      const result = createOrderReducer(initialState, action);

      expect(result).toEqual({
        orderLoading: true,
        orderErrors: false,
        orderNumber: null,
      });
    });

    it("should clear errors and set loading to true when starting request", () => {
      const stateWithError = {
        orderLoading: false,
        orderErrors: true,
        orderNumber: null,
      };
      const action = { type: ORDER_ACTIONS.CREATE_REQUEST };

      const result = createOrderReducer(stateWithError, action);

      expect(result.orderLoading).toBe(true);
      expect(result.orderErrors).toBe(false);
    });

    it("should preserve existing order number when starting new request", () => {
      const stateWithOrderNumber = {
        orderLoading: false,
        orderErrors: false,
        orderNumber: 12345,
      };
      const action = { type: ORDER_ACTIONS.CREATE_REQUEST };

      const result = createOrderReducer(stateWithOrderNumber, action);

      expect(result.orderNumber).toBe(12345);
    });
  });

  describe("CREATE_SUCCESS", () => {
    it("should handle CREATE_SUCCESS action with order number", () => {
      const orderNumber = 12345;
      const action = {
        type: ORDER_ACTIONS.CREATE_SUCCESS,
        orderNumber: orderNumber,
      };

      const result = createOrderReducer(initialState, action);

      expect(result).toEqual({
        orderLoading: false,
        orderErrors: false,
        orderNumber: orderNumber,
      });
    });

    it("should reset loading state and clear errors on success", () => {
      const orderNumber = 67890;
      const action = {
        type: ORDER_ACTIONS.CREATE_SUCCESS,
        orderNumber: orderNumber,
      };
      const loadingState = {
        orderLoading: true,
        orderErrors: false,
        orderNumber: null,
      };

      const result = createOrderReducer(loadingState, action);

      expect(result.orderLoading).toBe(false);
      expect(result.orderErrors).toBe(false);
    });

    it("should replace existing order number with new one", () => {
      const newOrderNumber = 99999;
      const action = {
        type: ORDER_ACTIONS.CREATE_SUCCESS,
        orderNumber: newOrderNumber,
      };
      const stateWithOldOrderNumber = {
        orderLoading: true,
        orderErrors: false,
        orderNumber: 11111,
      };

      const result = createOrderReducer(stateWithOldOrderNumber, action);

      expect(result.orderNumber).toBe(newOrderNumber);
    });

    it("should clear error flag when successfully creating order", () => {
      const action = {
        type: ORDER_ACTIONS.CREATE_SUCCESS,
        orderNumber: 12345,
      };
      const stateWithError = {
        orderLoading: true,
        orderErrors: true,
        orderNumber: null,
      };

      const result = createOrderReducer(stateWithError, action);

      expect(result.orderErrors).toBe(false);
    });
  });

  describe("CREATE_FAILURE", () => {
    it("should handle CREATE_FAILURE action", () => {
      const action = { type: ORDER_ACTIONS.CREATE_FAILURE };

      const result = createOrderReducer(initialState, action);

      expect(result).toEqual({
        orderLoading: false,
        orderErrors: true,
        orderNumber: null,
      });
    });

    it("should set error flag and reset loading state on failure", () => {
      const action = { type: ORDER_ACTIONS.CREATE_FAILURE };
      const loadingState = {
        orderLoading: true,
        orderErrors: false,
        orderNumber: 12345,
      };

      const result = createOrderReducer(loadingState, action);

      expect(result.orderLoading).toBe(false);
      expect(result.orderErrors).toBe(true);
    });

    it("should clear existing order number when creation fails", () => {
      const action = { type: ORDER_ACTIONS.CREATE_FAILURE };
      const stateWithOrderNumber = {
        orderLoading: true,
        orderErrors: false,
        orderNumber: 12345,
      };

      const result = createOrderReducer(stateWithOrderNumber, action);

      expect(result.orderNumber).toBe(null);
    });
  });

  describe("RESET", () => {
    it("should handle RESET action from initial state", () => {
      const action = { type: ORDER_ACTIONS.RESET };

      const result = createOrderReducer(initialState, action);

      expect(result).toEqual(initialState);
    });

    it("should reset to initial state from loading state", () => {
      const action = { type: ORDER_ACTIONS.RESET };
      const loadingState = {
        orderLoading: true,
        orderErrors: false,
        orderNumber: null,
      };

      const result = createOrderReducer(loadingState, action);

      expect(result).toEqual(initialState);
    });
  });
});
