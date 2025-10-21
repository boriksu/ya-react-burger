import { FC } from "react";
import { TOrder } from "../../data/types/types";
import styles from "./OrderList.module.css";
import OrdersListItem from "./OrderListItem/OrderListItem";

type TProp = {
  orders: Array<TOrder>;
};

const OrdersList: FC<TProp> = ({ orders }) => {
  if (!orders?.length) {
    return null;
  }

  return (
    <div className={`mt-4 ${styles.list}`}>
      {orders.map((order, index) => (
        <OrdersListItem key={index} order={order} isPerson={false} />
      ))}
    </div>
  );
};

export default OrdersList;
