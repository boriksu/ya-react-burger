import { TIngredient, TIngredientConstructor } from "../../../data/types/types";
import { CONSTRUCTOR_ACTIONS } from "../../actions/burger-constuctor";
import { burgerConstructorReducer } from "../burger-constructor";

describe("burgerConstructorReducer", () => {
  const initialState = {
    bun: null,
    ingredients: [],
  };

  const mockBun: TIngredient = {
    _id: "bun1",
    name: "Test Bun",
    type: "bun",
    price: 200,
    image: "bun_image",
    image_mobile: "bun_mobile",
    image_large: "bun_large",
    calories: 100,
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    __v: 0,
  };

  const mockIngredient: TIngredientConstructor = {
    _id: "ing1",
    name: "Test Ingredient",
    type: "main",
    price: 100,
    image: "ing_image",
    image_mobile: "ing_mobile",
    image_large: "ing_large",
    calories: 50,
    proteins: 5,
    fat: 3,
    carbohydrates: 10,
    __v: 0,
    id: "unique-id-1",
  };

  it("should return initial state when no state provided", () => {
    expect(burgerConstructorReducer(undefined, {} as any)).toEqual(
      initialState
    );
  });

  it("should return current state for unknown action", () => {
    const currentState = {
      bun: mockBun,
      ingredients: [mockIngredient],
    };
    const action = { type: "UNKNOWN_ACTION" };

    expect(burgerConstructorReducer(currentState, action as any)).toEqual(
      currentState
    );
  });

  describe("SELECT_BUN", () => {
    it("should handle SELECT_BUN action", () => {
      const action = {
        type: CONSTRUCTOR_ACTIONS.SELECT_BUN,
        item: mockBun,
      };

      const result = burgerConstructorReducer(initialState, action);

      expect(result.bun).toEqual(mockBun);
    });
  });

  describe("ADD_INGREDIENT", () => {
    it("should handle ADD_INGREDIENT action", () => {
      const action = {
        type: CONSTRUCTOR_ACTIONS.ADD_INGREDIENT,
        item: mockIngredient,
      };

      const result = burgerConstructorReducer(initialState, action);

      expect(result.ingredients).toHaveLength(1);
      expect(result.ingredients[0]).toEqual(mockIngredient);
    });
  });

  describe("REMOVE_INGREDIENT", () => {
    it("should handle REMOVE_INGREDIENT action", () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [mockIngredient],
      };
      const action = {
        type: CONSTRUCTOR_ACTIONS.REMOVE_INGREDIENT,
        index: 0,
      };

      const result = burgerConstructorReducer(stateWithIngredients, action);

      expect(result.ingredients).toHaveLength(0);
    });
  });

  describe("REORDER_INGREDIENTS", () => {
    it("should handle REORDER_INGREDIENTS action", () => {
      const ingredient1 = { ...mockIngredient, id: "id1" };
      const ingredient2 = { ...mockIngredient, id: "id2" };
      const stateWithIngredients = {
        bun: null,
        ingredients: [ingredient1, ingredient2],
      };
      const action = {
        type: CONSTRUCTOR_ACTIONS.REORDER_INGREDIENTS,
        index1: 0,
        index2: 1,
      };

      const result = burgerConstructorReducer(stateWithIngredients, action);

      expect(result.ingredients[0]).toEqual(ingredient2);
      expect(result.ingredients[1]).toEqual(ingredient1);
    });
  });

  describe("CLEAN_ORDER", () => {
    it("should handle CLEAN_ORDER action", () => {
      const stateWithData = {
        bun: mockBun,
        ingredients: [mockIngredient],
      };
      const action = {
        type: CONSTRUCTOR_ACTIONS.CLEAN_ORDER,
      };

      const result = burgerConstructorReducer(stateWithData, action);

      expect(result).toEqual(initialState);
    });
  });
});
