import { FC, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { getOrderAction } from "../../services/actions/get-order";
import { useDispatch, useSelector } from "../../services/hook";
import { getIngredients, getOrderOne } from "../../services/selectors";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import naming from "../../data/ru.json";
import { TIngredient, TIngredientQty } from "../../data/types/types";
import styles from "./OrderInfo.module.css";

const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order } = useSelector(getOrderOne);
  const { data: ingredients } = useSelector(getIngredients);

  useEffect(() => {
    if (id) {
      dispatch(getOrderAction(id));
    }
  }, [dispatch, id]);

  const orderIngredients = useMemo(() => {
    if (!order?.ingredients) return null;

    const ingredientMap: Record<string, TIngredientQty> = {};

    order.ingredients.forEach((ingredientId) => {
      const ingredient = ingredients.find(
        (elem: TIngredient) => elem._id === ingredientId
      );
      if (ingredient) {
        if (!ingredientMap[ingredientId]) {
          ingredientMap[ingredientId] = { ...ingredient, qty: 0 };
        }
        ingredientMap[ingredientId].qty += 1;
      }
    });

    return order.ingredients
      .map((ingredientId) => ingredientMap[ingredientId])
      .filter(Boolean)
      .filter(
        (item, index, arr) => arr.findIndex((i) => i._id === item._id) === index
      );
  }, [ingredients, order]);

  const orderAmount = useMemo(() => {
    return (
      orderIngredients?.reduce(
        (total, item) => total + item.price * item.qty,
        0
      ) || 0
    );
  }, [orderIngredients]);

  const orderStatus = useMemo(() => {
    const statusMap = {
      done: naming.OrderInfo.done,
      created: naming.OrderInfo.created,
      pending: naming.OrderInfo.pending,
    };
    return order?.status
      ? statusMap[order.status as keyof typeof statusMap]
      : null;
  }, [order]);

  if (!order) {
    return (
      <main className={styles.main_container}>
        <p className="text text_type_main-default">
          {naming.OrderInfo.loading}
        </p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <p className="text text_type_digits-default mb-10">#{order.number}</p>

      <p className="text text_type_main-medium mb-3">{order.name}</p>

      <p className={`text text_type_main-default mb-10 ${styles.status}`}>
        {orderStatus}
      </p>

      <p className="text text_type_main-medium mb-2">
        {naming.OrderInfo.ingredients}
      </p>

      <section className={styles.content}>
        {orderIngredients?.map((item, index) => (
          <li key={`${item._id}-${index}`} className="mt-4 mr-6">
            <div className={styles.ingredient}>
              <div className={styles.icon_title}>
                <div className={styles.icon}>
                  <img src={item.image_mobile} alt={item.name} />
                </div>
                <p
                  className={`text text_type_main-default ml-4 ${styles.title}`}
                >
                  {item.name}
                </p>
              </div>

              <div className={styles.count_price}>
                <span className="text text_type_digits-default mr-2">
                  {item.qty} x {item.price}
                </span>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </li>
        ))}
      </section>

      <section
        className={`text text_type_main-default mt-10 mb-6 ${styles.footer}`}
      >
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate
            date={new Date(order.createdAt)}
            className="text text_type_main-default text_color_inactive"
          />
        </p>

        <div className={styles.count_price}>
          <span className="text text_type_digits-default mr-2">
            {orderAmount}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    </main>
  );
};

export default OrderInfo;
