import { createOrder } from "../../data/orderCreate";

export const ORDER_ACTIONS = {
  CREATE_REQUEST: "CREATE_REQUEST",
  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_FAILURE: "CREATE_FAILURE",
  RESET: "RESET",
};

export function orderAction(ingredients) {
  return function (dispatch) {
    dispatch({ type: ORDER_ACTIONS.CREATE_REQUEST });
    createOrder(ingredients)
      .then((data) => {
        dispatch({ type: ORDER_ACTIONS.CREATE_SUCCESS, orderNumber: data });
      })
      .catch((err) => {
        dispatch({ type: ORDER_ACTIONS.CREATE_FAILURE });
      });
  };
}
