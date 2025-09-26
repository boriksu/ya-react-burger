import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { INGREDIENT_TYPES } from "../../../data/ingredientType";
import naming from "../../../data/ru.json";
import { TAB_ACTIONS } from "../../../services/actions/index";
import styles from "./BurgerIngredientsTabs.module.css";
import { getTab } from "../../../services/selectors";
import { FC } from "react";

type TProps = {
  handleTabChange: (type: string) => void;
};

const BurgerIngredientsTabs: FC<TProps> = ({ handleTabChange }) => {
  const activeTab = useSelector(getTab);
  const dispatch = useDispatch();

  const handleTabClick = (type: string) => {
    dispatch({ type: TAB_ACTIONS.CHANGE_TAB, tab: type });
    handleTabChange(type);
  };

  return (
    <div className={`${styles.tabsContainer} mb-2`}>
      {Object.entries(INGREDIENT_TYPES).map(([key, type]) => (
        <Tab
          key={type}
          value={type}
          active={activeTab === type}
          onClick={handleTabClick}
        >
          {naming.BurgerIngredients[type]}
        </Tab>
      ))}
    </div>
  );
};

export default BurgerIngredientsTabs;
