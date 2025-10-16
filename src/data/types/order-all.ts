import { ORDERS_ALL_ACTIONS } from "../../services/actions";
import { TOrder } from "./types";

type TOrdersList = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

export interface IOrdersAllStartAction {
  readonly type: typeof ORDERS_ALL_ACTIONS.START;
  readonly url: string;
}

export interface IOrdersAllOpenAction {
  readonly type: typeof ORDERS_ALL_ACTIONS.OPEN;
}

export interface IOrdersAllEndAction {
  readonly type: typeof ORDERS_ALL_ACTIONS.END;
}

export interface IOrdersAllSuccessAction {
  readonly type: typeof ORDERS_ALL_ACTIONS.SUCCESS;
}

export interface IOrdersAllErrorAction {
  readonly type: typeof ORDERS_ALL_ACTIONS.ERROR;
  readonly error: string;
}

export interface IOrdersAllClosedAction {
  readonly type: typeof ORDERS_ALL_ACTIONS.CLOSED;
}

export interface IOrdersAllMessageAction {
  readonly type: typeof ORDERS_ALL_ACTIONS.MESSAGE;
  readonly message: TOrdersList;
}

// Union type
export type TOrdersAllActions =
  | IOrdersAllStartAction
  | IOrdersAllOpenAction
  | IOrdersAllEndAction
  | IOrdersAllSuccessAction
  | IOrdersAllErrorAction
  | IOrdersAllClosedAction
  | IOrdersAllMessageAction;

// WebSocket actions configuration
export type TWebSocketOrdersAllActions = {
  onStart: typeof ORDERS_ALL_ACTIONS.START;
  onOpen: typeof ORDERS_ALL_ACTIONS.OPEN;
  onSuccess: typeof ORDERS_ALL_ACTIONS.SUCCESS;
  onClosed: typeof ORDERS_ALL_ACTIONS.CLOSED;
  onDisconnect: typeof ORDERS_ALL_ACTIONS.END;
  onError: typeof ORDERS_ALL_ACTIONS.ERROR;
  onMessage: typeof ORDERS_ALL_ACTIONS.MESSAGE;
};

export const wsOrdersAllActions: TWebSocketOrdersAllActions = {
  onStart: ORDERS_ALL_ACTIONS.START,
  onOpen: ORDERS_ALL_ACTIONS.OPEN,
  onSuccess: ORDERS_ALL_ACTIONS.SUCCESS,
  onClosed: ORDERS_ALL_ACTIONS.CLOSED,
  onDisconnect: ORDERS_ALL_ACTIONS.END,
  onError: ORDERS_ALL_ACTIONS.ERROR,
  onMessage: ORDERS_ALL_ACTIONS.MESSAGE,
};
