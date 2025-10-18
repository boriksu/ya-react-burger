import { ORDERS_USER_ACTIONS } from "../../services/actions";
import { TOrder } from "./types";

type TOrdersList = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

export interface IOrdersUserStartAction {
  readonly type: typeof ORDERS_USER_ACTIONS.START;
  readonly url: string;
}

export interface IOrdersUserOpenAction {
  readonly type: typeof ORDERS_USER_ACTIONS.OPEN;
}

export interface IOrdersUserEndAction {
  readonly type: typeof ORDERS_USER_ACTIONS.END;
}

export interface IOrdersUserSuccessAction {
  readonly type: typeof ORDERS_USER_ACTIONS.SUCCESS;
}

export interface IOrdersUserErrorAction {
  readonly type: typeof ORDERS_USER_ACTIONS.ERROR;
  readonly error: string;
}

export interface IOrdersUserClosedAction {
  readonly type: typeof ORDERS_USER_ACTIONS.CLOSED;
}

export interface IOrdersUserMessageAction {
  readonly type: typeof ORDERS_USER_ACTIONS.MESSAGE;
  readonly message: TOrdersList;
}

export type TOrdersUserActions =
  | IOrdersUserStartAction
  | IOrdersUserOpenAction
  | IOrdersUserEndAction
  | IOrdersUserSuccessAction
  | IOrdersUserErrorAction
  | IOrdersUserClosedAction
  | IOrdersUserMessageAction;

export type TWebSocketOrdersUserActions = {
  onStart: typeof ORDERS_USER_ACTIONS.START;
  onOpen: typeof ORDERS_USER_ACTIONS.OPEN;
  onSuccess: typeof ORDERS_USER_ACTIONS.SUCCESS;
  onClosed: typeof ORDERS_USER_ACTIONS.CLOSED;
  onDisconnect: typeof ORDERS_USER_ACTIONS.END;
  onError: typeof ORDERS_USER_ACTIONS.ERROR;
  onMessage: typeof ORDERS_USER_ACTIONS.MESSAGE;
};

export const wsOrdersUserActions: TWebSocketOrdersUserActions = {
  onStart: ORDERS_USER_ACTIONS.START,
  onOpen: ORDERS_USER_ACTIONS.OPEN,
  onSuccess: ORDERS_USER_ACTIONS.SUCCESS,
  onClosed: ORDERS_USER_ACTIONS.CLOSED,
  onDisconnect: ORDERS_USER_ACTIONS.END,
  onError: ORDERS_USER_ACTIONS.ERROR,
  onMessage: ORDERS_USER_ACTIONS.MESSAGE,
};
