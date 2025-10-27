import { TOrder } from "../../data/types/types";

import { TOrdersUserActions } from "../../data/types/orders-user";
import { ORDERS_USER_ACTIONS } from "../actions";

type TOrdersList = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

type TOrdersUserState = {
  isLoadedData: boolean;
  message: TOrdersList | null;
  error: string | null;
};

export const initialState: TOrdersUserState = {
  isLoadedData: false,
  message: null,
  error: null,
};

export const ordersUserReducer = (
  state = initialState,
  action: TOrdersUserActions
): TOrdersUserState => {
  switch (action.type) {
    case ORDERS_USER_ACTIONS.SUCCESS:
      return { ...state, error: null, isLoadedData: true };
    case ORDERS_USER_ACTIONS.ERROR:
      return { ...state, error: action.error, isLoadedData: false };
    case ORDERS_USER_ACTIONS.CLOSED:
      return { ...state, error: null, isLoadedData: false };
    case ORDERS_USER_ACTIONS.MESSAGE:
      return { ...state, error: null, message: action.message };
    default:
      return state;
  }
};
