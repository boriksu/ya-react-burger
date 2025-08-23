import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { dataPropTypes } from "../../../data/dataPropTypes";
import { CONSTRUCTOR_ACTIONS } from "../../../services/actions/index";
import styles from "./BurgerConstructorIngredient.module.css";

function BurgerConstructorIngredient({ item, index, onRemove }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, drag] = useDrag({
    type: "sort",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "sort",
    drop(item) {
      if (index !== item.index) {
        dispatch({
          type: CONSTRUCTOR_ACTIONS.REORDER_INGREDIENTS,
          index1: index,
          index2: item.index,
        });
      }
    },
  });

  drag(drop(ref));

  return (
    <li className={`${styles.ingredientList} mt-4`} key={index} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        extraClass={`${styles.ingredient} ml-2`}
        handleClose={() => onRemove(index)}
      />
    </li>
  );
}

BurgerConstructorIngredient.propTypes = {
  item: dataPropTypes.isRequired,
  index: propTypes.number,
  onRemove: propTypes.func.isRequired,
};

export default BurgerConstructorIngredient;
