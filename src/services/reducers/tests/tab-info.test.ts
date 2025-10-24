import { INGREDIENT_TYPES } from "../../../data/ingredientType";
import { TAB_ACTIONS } from "../../actions/tab-info";
import { initialState, tabInfoReducer } from "../tab-info";

describe("tabInfoReducer", () => {
  describe("initial state", () => {
    it("should return initial state when no state provided", () => {
      expect(tabInfoReducer(undefined, {} as any)).toEqual(initialState);
    });

    it("should return current state for unknown action", () => {
      const currentState = { tab: INGREDIENT_TYPES.SAUCE };
      const action = { type: "UNKNOWN_ACTION" };

      expect(tabInfoReducer(currentState, action as any)).toEqual(currentState);
    });
  });

  describe("CHANGE_TAB", () => {
    it("should handle CHANGE_TAB action with valid tab", () => {
      const action = {
        type: TAB_ACTIONS.CHANGE_TAB,
        tab: INGREDIENT_TYPES.SAUCE,
      };

      const result = tabInfoReducer(initialState, action);

      expect(result).toEqual({
        tab: INGREDIENT_TYPES.SAUCE,
      });
    });

    it("should handle CHANGE_TAB action with main tab", () => {
      const action = {
        type: TAB_ACTIONS.CHANGE_TAB,
        tab: INGREDIENT_TYPES.MAIN,
      };

      const result = tabInfoReducer(initialState, action);

      expect(result).toEqual({
        tab: INGREDIENT_TYPES.MAIN,
      });
    });

    it("should handle CHANGE_TAB action with bun tab", () => {
      const currentState = { tab: INGREDIENT_TYPES.SAUCE };
      const action = {
        type: TAB_ACTIONS.CHANGE_TAB,
        tab: INGREDIENT_TYPES.BUN,
      };

      const result = tabInfoReducer(currentState, action);

      expect(result).toEqual({
        tab: INGREDIENT_TYPES.BUN,
      });
    });
  });
});
