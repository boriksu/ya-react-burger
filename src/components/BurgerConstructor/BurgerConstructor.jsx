import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { dataPropTypes } from "../../data/dataPropTypes";
import styles from "./BurgerConstructor.module.css";
import BurgerConstructorOrder from "./BurgerConstructorOrder/BurgerConstructorOrder";

const BurgerConstructor = ({ data }) => {
  const [bun, otherIngredients] = useMemo(() => {
    const bunItem = data.find((item) => item.type === "bun");
    const otherItems = data.filter((item) => item.type !== "bun");
    return [bunItem, otherItems];
  }, [data]);

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = otherIngredients.reduce(
      (acc, item) => acc + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, otherIngredients]);

  return (
    <section style={{ flex: "0 0 600px" }}>
      <div className="mt-25 ml-4" styles={{ padding: 0 }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.ingredientBackground} ml-8`}
        />
        <ul className={`${styles.scrollBar} mt-4 mb-4`}>
          {otherIngredients.map((item, index) => (
            <li className={`${styles.otherIngredients} mt-4`} key={index}>
              <span style={{ cursor: "grabbing" }}>
                <DragIcon type="primary" />
              </span>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                extraClass={`${styles.ingredientBackground} ml-2`}
              />
            </li>
          ))}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.ingredientBackground} ml-8`}
        />
      </div>

      <BurgerConstructorOrder totalPrice={totalPrice} orderNumber="034536" />
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;
