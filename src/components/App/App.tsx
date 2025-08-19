import { useEffect, useState } from "react";
import { getData } from "../../data/getData";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import styles from "./App.module.css";

const App = () => {
  const [state, setState] = useState({
    data: null,
  });

  useEffect(() => {
    getData()
      .then((data) => {
        setState({ data: data });
      })
      .catch((err) => {
        setState({ data: null });
      });
  }, []);

  return (
    <>
      {state.data ? (
        state.data && (
          <>
            <AppHeader />
            <main className={styles.container}>
              <div className={styles.content}>
                <BurgerIngredients data={state.data} />
                <BurgerConstructor data={state.data} />
              </div>
            </main>
          </>
        )
      ) : (
        <main className={styles.loading}>
          <p className="text text_type_main-large">LOADING...</p>
        </main>
      )}
    </>
  );
};

export default App;
