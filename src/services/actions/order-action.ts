import { createOrder } from "../../data/api/createOrder";
import { AppDispatch, TIngredient } from "../../data/types/types";

export const ORDER_ACTIONS = {
  CREATE_REQUEST: "CREATE_REQUEST",
  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_FAILURE: "CREATE_FAILURE",
  RESET: "RESET",
} as const;

export interface ICreateOrderStartAction {
  type: typeof ORDER_ACTIONS.CREATE_REQUEST;
}

export interface ICreateOrderSuccessAction {
  type: typeof ORDER_ACTIONS.CREATE_SUCCESS;
  orderNumber: number;
}

export interface ICreateOrderErrorAction {
  type: typeof ORDER_ACTIONS.CREATE_FAILURE;
}

export interface IClearOrderAction {
  type: typeof ORDER_ACTIONS.RESET;
}

export type TCreateOrderActions =
  | ICreateOrderStartAction
  | ICreateOrderSuccessAction
  | ICreateOrderErrorAction
  | IClearOrderAction;

export const orderAction = (ingredients: Array<TIngredient>) => {
  return (dispatch: AppDispatch) => {
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
};
