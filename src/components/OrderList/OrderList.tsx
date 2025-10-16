import { FC } from "react";
import { TOrder } from "../../data/types/types";
import OrdersListItem from "./OrderListItem/OrderListItem";

type TProp = {
  orders: Array<TOrder>;
};

const OrdersList: FC<TProp> = ({ orders }) => {
  if (!orders?.length) {
    return null;
  }

  return (
    <div className="feed_orders mt-4">
      {orders.map((order, index) => (
        <OrdersListItem key={index} order={order} isPerson={false} />
      ))}
    </div>
  );
};

export default OrdersList;
