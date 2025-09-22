import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo } from "react";
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
import Modal from "../../Modal/Modal";
import styles from "./BurgerConstructorOrder.module.css";
import OrderDetails from "./OrderDetails/OrderDetails";

const BurgerConstructorOrder = ({ totalPrice }) => {
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { orderNumber, orderLoading, orderErrors } = useSelector(
    (state) => state.createOrder
  );

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
  const { authLogIn, authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authLogIn) {
      dispatch(authGetUserAction());
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
      dispatch(orderAction(orderIngredients));
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

BurgerConstructorOrder.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default BurgerConstructorOrder;
