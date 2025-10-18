import { useMemo, FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hook";
import { useParams } from "react-router";
import { getIngredients, getOrderOne } from "../../services/selectors";
import { getOrderAction } from "../../services/actions/get-order";

import styles from "./OrderInfo.module.css";
import { TIngredient, TIngredientQty } from "../../data/types/types";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

type TProps = {
  item?: TIngredient;
};

const OrderInfo: FC<TProps> = ({ item }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order } = useSelector(getOrderOne);
  const { data: ingredients } = useSelector(getIngredients);

  // Загрузка данных заказа
  useEffect(() => {
    if (id) {
      dispatch(getOrderAction(id));
    }
  }, [dispatch, id]);

  // Группировка и подсчет ингредиентов
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

    // Сохраняем порядок из исходного массива
    return order.ingredients
      .map((ingredientId) => ingredientMap[ingredientId])
      .filter(Boolean)
      .filter(
        (item, index, arr) => arr.findIndex((i) => i._id === item._id) === index
      );
  }, [ingredients, order]);

  // Подсчет общей суммы
  const orderAmount = useMemo(() => {
    return (
      orderIngredients?.reduce(
        (total, item) => total + item.price * item.qty,
        0
      ) || 0
    );
  }, [orderIngredients]);

  // Статус заказа
  const orderStatus = useMemo(() => {
    const statusMap = {
      done: "Выполнен",
      created: "Создан",
      pending: "Готовится",
    };
    return order?.status
      ? statusMap[order.status as keyof typeof statusMap]
      : null;
  }, [order]);

  // Если заказ не загружен
  if (!order) {
    return (
      <main className={styles.main_container}>
        <p className="text text_type_main-default">Загрузка заказа...</p>
      </main>
    );
  }

  return (
    <main className={styles.main_container}>
      <p
        className={`text text_type_digits-default mb-10 ${styles.number_order}`}
      >
        #{order.number}
      </p>

      <p className="text text_type_main-medium mb-3">{order.name}</p>

      <p className={`text text_type_main-default mb-10 ${styles.status_order}`}>
        {orderStatus}
      </p>

      <p className="text text_type_main-medium mb-2">Состав:</p>

      <section className={styles.fill_order}>
        {orderIngredients?.map((item, index) => (
          <li key={`${item._id}-${index}`} className="mt-4 mr-6">
            <div className={styles.row_fill}>
              <div className={styles.image_name}>
                <div className={styles.image_fill}>
                  <img src={item.image_mobile} alt={item.name} />
                </div>
                <p
                  className={`text text_type_main-default ml-4 ${styles.pname}`}
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
        className={`text text_type_main-default mt-10 mb-6 ${styles.food_order}`}
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
