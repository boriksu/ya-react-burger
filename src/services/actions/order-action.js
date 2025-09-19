import { createOrder } from "../../data/api/createOrder";

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
        dispatch({
          type: ORDER_ACTIONS.CREATE_SUCCESS,
          orderNumber: data.order.number,
        });
      })
      .catch((err) => {
        dispatch({ type: ORDER_ACTIONS.CREATE_FAILURE });
      });
  };
}
