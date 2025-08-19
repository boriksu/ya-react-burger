import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useState } from "react";
import naming from "../../../data/ru.json";

const INGREDIENT_TYPES = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
};

const BurgerIngredientsTabs = ({ handleTabChange }) => {
  const [activeTab, setActiveTab] = useState(INGREDIENT_TYPES.BUN);

  const handleTabClick = (type) => {
    setActiveTab(type);
    handleTabChange(type);
  };

  return (
    <div className="mb-8" style={{ display: "flex" }}>
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

BurgerIngredientsTabs.propTypes = {
  handleTabChange: PropTypes.func.isRequired,
};

export default BurgerIngredientsTabs;
