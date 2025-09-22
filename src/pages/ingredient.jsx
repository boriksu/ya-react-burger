import IngredientDetails from "../components/BurgerIngredients/BurgerIngredientsItem/IngredientDetails/IngredientDetails";
import styles from "./page.module.css";

const IngredientPage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <IngredientDetails />
      </div>
    </main>
  );
};

export default IngredientPage;
