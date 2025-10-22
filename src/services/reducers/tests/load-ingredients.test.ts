import { TIngredient } from "../../../data/types/types";
import { INGREDIENTS_ACTIONS } from "../../actions/ingredients-action";
import { loadIngredientsReducer } from "../load-ingredients";

// Моки для тестовых данных
const mockIngredient: TIngredient = {
  _id: "1",
  name: "Test Bun",
  type: "bun",
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  price: 200,
  image: "image_url",
  image_mobile: "mobile_image_url",
  image_large: "large_image_url",
  __v: 0,
};

const mockIngredientsData: TIngredient[] = [
  mockIngredient,
  {
    ...mockIngredient,
    _id: "2",
    name: "Test Sauce",
    type: "sauce",
    price: 150,
  },
  {
    ...mockIngredient,
    _id: "3",
    name: "Test Main",
    type: "main",
    price: 180,
  },
];

describe("loadIngredientsReducer", () => {
  const initialState = {
    dataLoading: false,
    dataErrors: false,
    data: [],
  };

  describe("initial state", () => {
    it("should return initial state when no state provided", () => {
      expect(loadIngredientsReducer(undefined, {} as any)).toEqual(
        initialState
      );
    });

    it("should return current state for unknown action", () => {
      const currentState = {
        dataLoading: true,
        dataErrors: false,
        data: mockIngredientsData,
      };
      const action = { type: "UNKNOWN_ACTION" };

      expect(loadIngredientsReducer(currentState, action as any)).toEqual(
        currentState
      );
    });
  });

  describe("FETCH_REQUEST", () => {
    it("should handle FETCH_REQUEST action from initial state", () => {
      const action = { type: INGREDIENTS_ACTIONS.FETCH_REQUEST };

      const result = loadIngredientsReducer(initialState, action);

      expect(result).toEqual({
        dataLoading: true,
        dataErrors: false,
        data: [],
      });
    });

    it("should reset errors and set loading to true when starting fetch", () => {
      const stateWithError = {
        dataLoading: false,
        dataErrors: true,
        data: [],
      };
      const action = { type: INGREDIENTS_ACTIONS.FETCH_REQUEST };

      const result = loadIngredientsReducer(stateWithError, action);

      expect(result.dataLoading).toBe(true);
      expect(result.dataErrors).toBe(false);
    });

    it("should preserve existing data when starting new request", () => {
      const stateWithData = {
        dataLoading: false,
        dataErrors: false,
        data: mockIngredientsData,
      };
      const action = { type: INGREDIENTS_ACTIONS.FETCH_REQUEST };

      const result = loadIngredientsReducer(stateWithData, action);

      expect(result.dataLoading).toBe(true);
      expect(result.dataErrors).toBe(false);
      expect(result.data).toEqual(mockIngredientsData);
    });
  });

  describe("FETCH_SUCCESS", () => {
    it("should handle FETCH_SUCCESS action with data", () => {
      const action = {
        type: INGREDIENTS_ACTIONS.FETCH_SUCCESS,
        data: mockIngredientsData,
      };

      const result = loadIngredientsReducer(initialState, action);

      expect(result).toEqual({
        dataLoading: false,
        dataErrors: false,
        data: mockIngredientsData,
      });
    });

    it("should reset loading state and clear errors on success", () => {
      const action = {
        type: INGREDIENTS_ACTIONS.FETCH_SUCCESS,
        data: mockIngredientsData,
      };
      const loadingState = {
        dataLoading: true,
        dataErrors: false,
        data: [],
      };

      const result = loadIngredientsReducer(loadingState, action);

      expect(result.dataLoading).toBe(false);
      expect(result.dataErrors).toBe(false);
      expect(result.data).toEqual(mockIngredientsData);
    });

    it("should replace existing data with new data", () => {
      const oldData = [mockIngredient];
      const newData = [
        { ...mockIngredient, _id: "4", name: "New Ingredient" },
        { ...mockIngredient, _id: "5", name: "Another Ingredient" },
      ];
      const action = {
        type: INGREDIENTS_ACTIONS.FETCH_SUCCESS,
        data: newData,
      };
      const stateWithOldData = {
        dataLoading: true,
        dataErrors: false,
        data: oldData,
      };

      const result = loadIngredientsReducer(stateWithOldData, action);

      expect(result.data).toEqual(newData);
      expect(result.data).not.toEqual(oldData);
    });

    it("should handle empty data array", () => {
      const action = {
        type: INGREDIENTS_ACTIONS.FETCH_SUCCESS,
        data: [],
      };

      const result = loadIngredientsReducer(initialState, action);

      expect(result.data).toEqual([]);
      expect(result.dataLoading).toBe(false);
      expect(result.dataErrors).toBe(false);
    });
  });

  describe("FETCH_FAILURE", () => {
    it("should handle FETCH_FAILURE action", () => {
      const action = { type: INGREDIENTS_ACTIONS.FETCH_FAILURE };

      const result = loadIngredientsReducer(initialState, action);

      expect(result).toEqual({
        dataLoading: false,
        dataErrors: true,
        data: [],
      });
    });

    it("should set error flag and reset loading state on failure", () => {
      const action = { type: INGREDIENTS_ACTIONS.FETCH_FAILURE };
      const loadingState = {
        dataLoading: true,
        dataErrors: false,
        data: mockIngredientsData,
      };

      const result = loadIngredientsReducer(loadingState, action);

      expect(result.dataLoading).toBe(false);
      expect(result.dataErrors).toBe(true);
    });

    it("should clear existing data when fetch fails", () => {
      const action = { type: INGREDIENTS_ACTIONS.FETCH_FAILURE };
      const stateWithData = {
        dataLoading: true,
        dataErrors: false,
        data: mockIngredientsData,
      };

      const result = loadIngredientsReducer(stateWithData, action);

      expect(result.data).toEqual([]);
    });
  });
});
