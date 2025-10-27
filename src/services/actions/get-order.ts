import { getOrder } from "../../data/api/auth/getOrder";
import { AppDispatch, TOrder } from "../../data/types/types";

export const GET_ORDER_ACTIONS = {
  START: "START",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  RESET: "RESET",
} as const;

export interface IGetOrderStartAction {
  type: typeof GET_ORDER_ACTIONS.START;
}

export interface IGetOrderSuccessAction {
  type: typeof GET_ORDER_ACTIONS.SUCCESS;
  order: TOrder;
}

export interface IGetOrderErrorAction {
  type: typeof GET_ORDER_ACTIONS.ERROR;
  message: string;
}

export type TGetOrderActions =
  | IGetOrderStartAction
  | IGetOrderSuccessAction
  | IGetOrderErrorAction;

export const getOrderAction = (orderNum?: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: GET_ORDER_ACTIONS.START });
    getOrder(orderNum)
      .then((result) => {
        dispatch({ type: GET_ORDER_ACTIONS.SUCCESS, order: result.orders[0] });
      })
      .catch((err) => {
        dispatch({ type: GET_ORDER_ACTIONS.ERROR, message: err.message });
      });
  };
};
