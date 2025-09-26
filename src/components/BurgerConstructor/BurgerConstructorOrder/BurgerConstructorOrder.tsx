import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { URL_LOGIN } from "../../../data/routes";
import naming from "../../../data/ru.json";
import { authGetUserAction } from "../../../services/actions/auth/auth";
import { CONSTRUCTOR_ACTIONS } from "../../../services/actions/index";
import {
  ORDER_ACTIONS,
  orderAction,
} from "../../../services/actions/order-action";
import { getAuth, getConstructor, getOrder } from "../../../services/selectors";
import Modal from "../../Modal/Modal";
import styles from "./BurgerConstructorOrder.module.css";
import OrderDetails from "./OrderDetails/OrderDetails";

type TProps = {
  totalPrice: number;
};

const BurgerConstructorOrder: FC<TProps> = ({ totalPrice }) => {
  const { bun, ingredients } = useSelector(getConstructor);
  const { orderNumber, orderLoading, orderErrors } = useSelector(getOrder);

  useEffect(() => {
    if (orderErrors) {
      alert(naming.BurgerConstructorOrder.error);
    }
  }, [orderErrors]);

  const disabled = useMemo(() => {
    let hasIngredient = (ingredients && ingredients.length > 0) || bun;
    let hasOrder = orderNumber !== null || orderLoading;
    return !hasIngredient || hasOrder;
  }, [bun, ingredients, orderNumber, orderLoading]);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { authLogIn, authLoading } = useSelector(getAuth);

  useEffect(() => {
    if (!authLogIn) {
      dispatch(authGetUserAction() as any);
    }
  }, [authLogIn, dispatch]);

  const showOrderDetails = useCallback(() => {
    if (authLoading) {
      return;
    }

    if (!authLogIn) {
      navigate(URL_LOGIN, { replace: true });
    } else {
      const orderIngredients = [...ingredients];
      if (bun) {
        orderIngredients.push(bun, bun);
      }
      dispatch(orderAction(orderIngredients) as any);
    }
  }, [authLoading, authLogIn, navigate, ingredients, bun, dispatch]);

  const hideOrderDetails = () => {
    dispatch({ type: ORDER_ACTIONS.RESET });
    dispatch({ type: CONSTRUCTOR_ACTIONS.CLEAN_ORDER });
  };

  return (
    <div className={`${styles.totalPrice} mr-4 mt-10`}>
      <div className="mr-2 mb-1 text text_type_digits-medium">{totalPrice}</div>
      <div className={`${styles.currency} mr-10`}>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        onClick={showOrderDetails}
        disabled={disabled}
      >
        {naming.BurgerConstructorOrder.order}
      </Button>
      {orderNumber && (
        <Modal onClose={hideOrderDetails}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructorOrder;
