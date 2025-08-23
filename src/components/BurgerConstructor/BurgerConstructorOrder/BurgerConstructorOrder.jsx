import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import naming from "../../../data/ru.json";
import Modal from "../../Modal/Modal";
import styles from "./BurgerConstructorOrder.module.css";
import OrderDetails from "./OrderDetails/OrderDetails";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ORDER_ACTIONS,
  orderAction,
} from "../../../services/actions/create-order";

const BurgerConstructorOrder = () => {
  const { bun, ingredients, sum } = useSelector(
    (state) => state.burgerConstructor
  );
  const { orderNumber, orderLoading, orderHasErrors } = useSelector(
    (state) => state.createOrder
  );

  useEffect(() => {
    if (orderHasErrors) {
      alert(naming.BurgerConstructorOrder.error);
    }
  }, [orderHasErrors]);

  const disabled = useMemo(() => {
    let hasIngredient = (ingredients && ingredients.length > 0) || bun;
    let hasOrder = orderNumber !== null || orderLoading;
    return !hasIngredient || hasOrder;
  }, [bun, ingredients, orderNumber, orderLoading]);

  const dispatch = useDispatch();

  function showOrderDetails() {
    const orderIngredients = [...ingredients];
    if (bun) {
      orderIngredients.push(bun, bun);
    }
    dispatch(orderAction(orderIngredients));
  }

  function hideOrderDetails() {
    dispatch({ type: ORDER_ACTIONS.RESET });
  }

  return (
    <div className={`${styles.totalPrice} mr-4 mt-10`}>
      <div className="mr-2 mb-1 text text_type_digits-medium">{sum}</div>
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
