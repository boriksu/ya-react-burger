import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ingredientsAction } from "../../services/actions/ingredients-action";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import styles from "./App.module.css";

const App = () => {
  const { data, dataLoading, dataErrors } = useSelector(
    (state) => state.loadIngredients
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ingredientsAction());
  }, [dispatch]);

  return (
    <>
      {dataLoading || dataErrors ? (
        <main className={styles.loading}>
          <p className="text text_type_main-large">LOADING...</p>
        </main>
      ) : data && data.length > 0 ? (
        <>
          <AppHeader />
          <main className={styles.container}>
            <div className={styles.content}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </main>
        </>
      ) : undefined}
    </>
  );
};

export default App;
