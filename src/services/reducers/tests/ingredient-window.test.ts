import { TIngredient } from "../../../data/types/types";
import { INGREDIENTS_ACTIONS } from "../../actions/ingredients-action";
import { ingredientWindowReducer, initialState } from "../ingredient-window";

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

describe("ingredientWindowReducer", () => {
  describe("initial state", () => {
    it("should return initial state when no state provided", () => {
      expect(ingredientWindowReducer(undefined, {} as any)).toEqual(
        initialState
      );
    });

    it("should return current state for unknown action", () => {
      const currentState = { displayedIngredient: mockIngredient };
      const action = { type: "UNKNOWN_ACTION" };

      expect(ingredientWindowReducer(currentState, action as any)).toEqual(
        currentState
      );
    });
  });

  describe("SHOW_DETAILS", () => {
    it("should handle SHOW_DETAILS action with ingredient", () => {
      const action = {
        type: INGREDIENTS_ACTIONS.SHOW_DETAILS,
        item: mockIngredient,
      };

      const result = ingredientWindowReducer(initialState, action);

      expect(result).toEqual({
        displayedIngredient: mockIngredient,
      });
    });
  });
});
