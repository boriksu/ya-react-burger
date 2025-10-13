import { FC, useEffect } from "react";

import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  URL_ANY,
  URL_FORGOT_PASSWORD,
  URL_INGREDIENTS,
  URL_LOGIN,
  URL_PROFILE,
  URL_PROFILE_LOGOUT,
  URL_PROFILE_ORDERS,
  URL_REGISTER,
  URL_RESET_PASSWORD,
  URL_ROOT,
} from "../../data/routes";
import { INGREDIENTS_ACTIONS } from "../../services/actions/ingredients-action";

import {
  ForgotPassword,
  IngredientPage,
  Login,
  MainPage,
  Page404,
  Profile,
  ProfileEdit,
  ProfileLogout,
  ProfileOrders,
  Register,
  ResetPassword,
} from "../../pages";
import AppHeader from "../AppHeader/AppHeader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import styles from "./App.module.css";

const App: FC = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const stateLocation = location.state && location.state.location;
  const item = location.state && location.state.item;
  useEffect(() => {
    dispatch({ type: INGREDIENTS_ACTIONS.SHOW_DETAILS, item: item });
  }, [dispatch, item]);

  return (
    <div className={styles.container}>
      <AppHeader />
      <div className={styles.main}>
        <Routes location={stateLocation || location}>
          <Route path={URL_ROOT} element={<MainPage />} />
          <Route path={`${URL_INGREDIENTS}/:id`} element={<IngredientPage />} />
          <Route path={URL_LOGIN} element={<Login />} />
          <Route path={URL_REGISTER} element={<Register />} />
          <Route path={URL_RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={URL_FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route
            path={URL_PROFILE}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileEdit />} />
            <Route path={URL_PROFILE_ORDERS} element={<ProfileOrders />} />
            <Route path={URL_PROFILE_LOGOUT} element={<ProfileLogout />} />
            <Route path={URL_ANY} element={<Page404 />} />
          </Route>
          <Route path={URL_ANY} element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
