import { loadIngredients } from "../../data/api/loadIngredients";

export const INGREDIENTS_ACTIONS = {
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
  SHOW_DETAILS: "SHOW_DETAILS",
};

export function ingredientsAction() {
  return function (dispatch) {
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
