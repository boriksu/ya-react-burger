import { loadIngredients } from "../../data/api/loadIngredients";
import { AppDispatch, TIngredient } from "../../data/types/types";
export const INGREDIENTS_ACTIONS = {
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
  SHOW_DETAILS: "SHOW_DETAILS",
} as const;

export interface ILoadDataStartAction {
  type: typeof INGREDIENTS_ACTIONS.FETCH_REQUEST;
}

export interface ILoadDataSuccessAction {
  type: typeof INGREDIENTS_ACTIONS.FETCH_SUCCESS;
  data: Array<TIngredient>;
}

export interface ILoadDataErrorAction {
  type: typeof INGREDIENTS_ACTIONS.FETCH_FAILURE;
}

export type TLoadIngredientsActions =
  | ILoadDataStartAction
  | ILoadDataSuccessAction
  | ILoadDataErrorAction;

export function ingredientsAction() {
  return function (dispatch: AppDispatch) {
    dispatch({ type: INGREDIENTS_ACTIONS.FETCH_REQUEST });
    loadIngredients()
      .then((data) => {
        dispatch({ type: INGREDIENTS_ACTIONS.FETCH_SUCCESS, data: data.data });
      })
      .catch((err) => {
        dispatch({ type: INGREDIENTS_ACTIONS.FETCH_FAILURE });
      });
  };
}

export interface SetDisplayedIngredientAction {
  type: typeof INGREDIENTS_ACTIONS.SHOW_DETAILS;
  item: TIngredient | null;
}

export type TIngredientWindowActions = SetDisplayedIngredientAction;
