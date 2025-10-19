import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "../../../services/hook";
import { getIngredients } from "../../../services/selectors";

import naming from "../../../data/ru.json";
import { TIngredient, TOrder } from "../../../data/types/types";
import styles from "./OrderListItem.module.css";

interface TProps {
  order: TOrder;
  isPerson?: boolean;
}

const OrdersListItem: FC<TProps> = ({ order, isPerson = false }) => {
  const location = useLocation();
  const { data } = useSelector(getIngredients);
  const limitCount = 5;

  const orderStatus = useMemo(() => {
    switch (order.status) {
      case "done":
        return naming.OrderListItem.done;
      case "created":
        return naming.OrderListItem.created;
      default:
        return naming.OrderListItem.pending;
    }
  }, [order.status]);

  const orderColor = useMemo(
    () =>
      order.status === "done" ? styles.status_done : styles.status_default,
    [order.status]
  );

  const orderIngredients = useMemo(
    () =>
      order.ingredients
        .map((elemId: string) =>
          data.find((elem: TIngredient) => elem._id === elemId)
        )
        .filter(Boolean) as TIngredient[],
    [data, order.ingredients]
  );

  const orderTotal = useMemo(
    () =>
      orderIngredients.reduce(
        (sum: number, elem: TIngredient) => elem.price + sum,
        0
      ),
    [orderIngredients]
  );

  const limitItems = useMemo(
    () => orderIngredients.slice(0, limitCount),
    [orderIngredients]
  );

  const hideCount = orderIngredients.length - limitCount;

  return (
    <Link
      className={styles.container}
      to={`${location.pathname}/${order.number}`}
      state={{ location }}
    >
      <div className="m-6">
        <div className={styles.header}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <FormattedDate
            date={new Date(order.createdAt)}
            className="text text_type_main-default text_color_inactive"
          />
        </div>
      </div>

      <p className={`${styles.title} text text_type_main-medium`}>
        {order.name}
      </p>

      {isPerson && (
        <p
          className={`${styles.status} ${orderColor} text text_type_main-default`}
        >
          {orderStatus}
        </p>
      )}

      <div className={styles.content}>
        <ul className={styles.list}>
          {limitItems.map((item, index) => (
            <li
              key={index}
              style={{ marginRight: -20 }}
              className={styles.ingredient}
            >
              <img
                style={{
                  opacity: index === limitCount - 1 && hideCount > 0 ? 0.4 : 1,
                }}
                src={item.image_mobile}
                alt={item.name}
                className={styles.icon}
              />
              {hideCount > 0 && index === limitCount - 1 && (
                <span
                  className={`${styles.hidden} text text_type_main-default`}
                >
                  +{hideCount}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.price}>
          <span className="text text_type_digits-default">{orderTotal}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrdersListItem;
