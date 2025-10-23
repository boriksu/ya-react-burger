import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, SyntheticEvent, useCallback } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { URL_INGREDIENTS } from "../../../data/routes";
import { TIngredient } from "../../../data/types/types";
import styles from "./BurgerIngredientsItem.module.css";

type TProps = {
  ingredient: TIngredient;
  count: number;
};

const BurgerIngredientItem: FC<TProps> = ({ ingredient, count }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const showIngredientDetails = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      navigate(`${URL_INGREDIENTS}/${ingredient._id}`, {
        state: { background: location },
      });
    },
    [navigate, location, ingredient]
  );

  const [, dragRef] = useDrag({
    type: ingredient.type,
    item: ingredient,
  });

  return (
    <Link
      className={styles.link}
      to={`${URL_INGREDIENTS}/${ingredient._id}`}
      onClick={showIngredientDetails}
      ref={dragRef}
    >
      <li className={`${styles.container} mt-6 mb-8 ml-3 mr-2`}>
        <img
          className={`${styles.image} ml-4 mr-4 mb-1`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={`${styles.price} mb-1`}>
          <span className="mr-2 text text_type_digits-default">
            {ingredient.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <div className={`${styles.name} text text_type_main-default`}>
          {ingredient.name}
        </div>
        {count > 0 && (
          <Counter count={count} size="default" extraClass={styles.count} />
        )}
      </li>
    </Link>
  );
};

export default React.memo(BurgerIngredientItem);
