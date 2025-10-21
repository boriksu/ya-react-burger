import { Action, ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TGetOrderActions } from "../../services/actions/get-order";
import store from "../../services/store";
import { TOrdersAllActions, TWebSocketOrdersAllActions } from "./order-all";
import { TOrdersUserActions, TWebSocketOrdersUserActions } from "./orders-user";

import { TAuthActions } from "../../services/actions/auth/auth-helper";
import {
  TIngredientWindowActions,
  TLoadIngredientsActions,
} from "../../services/actions/ingredients-action";

import { TBurgerConstructorActions } from "../../services/actions/burger-constuctor";
import { TTabInfoActions } from "../../services/actions/tab-info";

import { TCreateOrderActions } from "../../services/actions/order-action";

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};
export type TIngredientQty = TIngredient & {
  qty: number;
};

export type TIngredientConstructor = TIngredient & {
  id: string;
};

export type TUser = {
  name: string;
  email: string;
};

export type TForgotPassword = {
  email: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TPatchUser = {
  name: string;
  email: string;
  password: string;
};

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
};

export type TResetPassword = {
  password: string;
  token: string;
};

export type TOrder = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type RootState = ReturnType<typeof store.getState>;

export type TDispatch = typeof store.dispatch;

export type TAllActions =
  | TAuthActions
  | TBurgerConstructorActions
  | TCreateOrderActions
  | TIngredientWindowActions
  | TLoadIngredientsActions
  | TTabInfoActions
  | TOrdersAllActions
  | TOrdersUserActions
  | TGetOrderActions;

export type AppDispatch = ThunkDispatch<RootState, never, TAllActions>;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, Action, TAllActions>
>;

export type webSocketActionsTypes =
  | TWebSocketOrdersAllActions
  | TWebSocketOrdersUserActions;
