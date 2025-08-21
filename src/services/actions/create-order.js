import { orderCreate } from "../../utils/orderCreate";
import {
  CREATE_ORDER_ERROR,
  CREATE_ORDER_START,
  CREATE_ORDER_SUCCESS,
} from "./index";

export function createOrderAction(ingredients) {
  return function (dispatch) {
    dispatch({ type: CREATE_ORDER_START });
    orderCreate(ingredients)
      .then((data) => {
        dispatch({ type: CREATE_ORDER_SUCCESS, orderNumber: data });
      })
      .catch((err) => {
        dispatch({ type: CREATE_ORDER_ERROR });
      });
  };
}
