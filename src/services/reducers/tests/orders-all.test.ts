import { TOrder } from "../../../data/types/types";
import { ORDERS_ALL_ACTIONS } from "../../actions";
import { initialState, ordersAllReducer } from "../orders-all";

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

const mockOrdersList = {
  orders: [mockOrder],
  total: 100,
  totalToday: 5,
};

describe("ordersAllReducer", () => {
  describe("initial state", () => {
    it("should return initial state when no state provided", () => {
      expect(ordersAllReducer(undefined, {} as any)).toEqual(initialState);
    });

    it("should return current state for unknown action", () => {
      const currentState = {
        isLoadedData: true,
        message: mockOrdersList,
        error: null,
      };
      const action = { type: "UNKNOWN_ACTION" };

      expect(ordersAllReducer(currentState, action as any)).toEqual(
        currentState
      );
    });
  });

  describe("SUCCESS", () => {
    it("should handle SUCCESS action", () => {
      const action = { type: ORDERS_ALL_ACTIONS.SUCCESS };
      const currentState = { ...initialState, error: "Previous error" };

      const result = ordersAllReducer(currentState, action);

      expect(result).toEqual({
        isLoadedData: true,
        message: null,
        error: null,
      });
    });

    it("should clear error and set isLoadedData to true", () => {
      const action = { type: ORDERS_ALL_ACTIONS.SUCCESS };
      const stateWithError = {
        isLoadedData: false,
        message: mockOrdersList,
        error: "Connection error",
      };

      const result = ordersAllReducer(stateWithError, action);

      expect(result.error).toBeNull();
      expect(result.isLoadedData).toBe(true);
      expect(result.message).toEqual(mockOrdersList);
    });
  });

  describe("ERROR", () => {
    it("should handle ERROR action", () => {
      const errorMessage = "WebSocket connection failed";
      const action = {
        type: ORDERS_ALL_ACTIONS.ERROR,
        error: errorMessage,
      };

      const result = ordersAllReducer(initialState, action);

      expect(result).toEqual({
        isLoadedData: false,
        message: null,
        error: errorMessage,
      });
    });

    it("should overwrite existing error and reset isLoadedData", () => {
      const newError = "New error message";
      const action = {
        type: ORDERS_ALL_ACTIONS.ERROR,
        error: newError,
      };
      const stateWithData = {
        isLoadedData: true,
        message: mockOrdersList,
        error: "Old error",
      };

      const result = ordersAllReducer(stateWithData, action);

      expect(result.error).toBe(newError);
      expect(result.isLoadedData).toBe(false);
      expect(result.message).toEqual(mockOrdersList);
    });
  });

  describe("CLOSED", () => {
    it("should handle CLOSED action", () => {
      const action = { type: ORDERS_ALL_ACTIONS.CLOSED };
      const stateWithData = {
        isLoadedData: true,
        message: mockOrdersList,
        error: "Some error",
      };

      const result = ordersAllReducer(stateWithData, action);

      expect(result).toEqual({
        isLoadedData: false,
        message: mockOrdersList,
        error: null,
      });
    });

    it("should reset loading state and clear error", () => {
      const action = { type: ORDERS_ALL_ACTIONS.CLOSED };

      const result = ordersAllReducer(initialState, action);

      expect(result.isLoadedData).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe("MESSAGE", () => {
    it("should handle MESSAGE action", () => {
      const action = {
        type: ORDERS_ALL_ACTIONS.MESSAGE,
        message: mockOrdersList,
      };

      const result = ordersAllReducer(initialState, action);

      expect(result).toEqual({
        isLoadedData: false,
        message: mockOrdersList,
        error: null,
      });
    });

    it("should clear error when receiving message", () => {
      const action = {
        type: ORDERS_ALL_ACTIONS.MESSAGE,
        message: mockOrdersList,
      };
      const stateWithError = {
        isLoadedData: false,
        message: null,
        error: "Previous error",
      };

      const result = ordersAllReducer(stateWithError, action);

      expect(result.message).toEqual(mockOrdersList);
      expect(result.error).toBeNull();
    });

    it("should replace existing message", () => {
      const newMessage = {
        orders: [mockOrder, { ...mockOrder, _id: "2", number: 2 }],
        total: 200,
        totalToday: 10,
      };
      const action = {
        type: ORDERS_ALL_ACTIONS.MESSAGE,
        message: newMessage,
      };
      const stateWithMessage = {
        isLoadedData: true,
        message: mockOrdersList,
        error: null,
      };

      const result = ordersAllReducer(stateWithMessage, action);

      expect(result.message).toEqual(newMessage);
      expect(result.isLoadedData).toBe(true);
    });
  });
});
