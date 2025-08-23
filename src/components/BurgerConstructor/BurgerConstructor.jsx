import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
// import { useMemo } from "react";

import { useEffect } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import naming from "../../data/ru.json";
import { CONSTRUCTOR_ACTIONS } from "../../services/actions/index";

import { INGREDIENT_TYPES } from "../../data/ingredientType";
import styles from "./BurgerConstructor.module.css";
import BurgerConstructorIngredient from "./BurgerConstructorIngredient/BurgerConstructorIngredient";
import BurgerConstructorOrder from "./BurgerConstructorOrder/BurgerConstructorOrder";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  useEffect(() => {
    let sum = 0;
    if (bun) {
      sum += bun.price * 2;
    }
    sum += ingredients.reduce((sum, item) => (sum += item.price), 0);
    dispatch({ type: CONSTRUCTOR_ACTIONS.UPDATE_TOTAL, sum });
  }, [bun, ingredients, dispatch]);

  const [, dropTargetBunUp] = useDrop({
    accept: INGREDIENT_TYPES.BUN,
    drop(item) {
      dispatch({ type: CONSTRUCTOR_ACTIONS.SELECT_BUN, item: item });
    },
  });

  const [, dropTargetBunDown] = useDrop({
    accept: INGREDIENT_TYPES.BUN,
    drop(item) {
      dispatch({ type: CONSTRUCTOR_ACTIONS.SELECT_BUN, item: item });
    },
  });

  const [, dropTargetIngredient] = useDrop({
    accept: [INGREDIENT_TYPES.SAUCE, INGREDIENT_TYPES.MAIN],
    drop(item) {
      dispatch({ type: CONSTRUCTOR_ACTIONS.ADD_INGREDIENT, item: item });
    },
  });

  function removeIngredient(index) {
    dispatch({ type: CONSTRUCTOR_ACTIONS.REMOVE_INGREDIENT, index: index });
  }

  return (
    <section className={styles.container}>
      <div className="mt-25 ml-4">
        <div ref={dropTargetBunUp}>
          {bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={`${styles.ingredient} ml-8`}
            />
          ) : (
            <div
              className={`${styles.addElement} constructor-element constructor-element_pos_top ml-8`}
            >
              <div className={`${styles.add} text text_type_main-default`}>
                {naming.BurgerConstructor.addBun}
              </div>
            </div>
          )}
        </div>
        <ul className={`${styles.scroll} mt-4 mb-4`} ref={dropTargetIngredient}>
          {ingredients && ingredients.length > 0 ? (
            ingredients.map((item, index) => (
              <BurgerConstructorIngredient
                key={uuid()}
                item={item}
                index={index}
                onRemove={removeIngredient}
              />
            ))
          ) : (
            <div className={`${styles.addElement} constructor-element ml-8`}>
              <div className={`${styles.add} text text_type_main-default`}>
                {naming.BurgerConstructor.addIngredient}
              </div>
            </div>
          )}
        </ul>
        <div ref={dropTargetBunDown}>
          {bun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={`${styles.ingredient} ml-8`}
            />
          ) : (
            <div
              className={`${styles.addElement} constructor-element constructor-element_pos_bottom ml-8`}
            >
              <div className={`${styles.add} text text_type_main-default`}>
                {naming.BurgerConstructor.addBun}
              </div>
            </div>
          )}
        </div>
      </div>

      <BurgerConstructorOrder />
    </section>
  );
};

export default BurgerConstructor;
