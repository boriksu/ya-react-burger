import { FC, useEffect } from "react";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  URL_ANY,
  URL_FEED,
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
import { useDispatch } from "../../services/hook";

import {
  FeedPage,
  ForgotPassword,
  IngredientPage,
  Login,
  MainPage,
  OrderPage,
  Page404,
  Profile,
  ProfileEdit,
  ProfileLogout,
  ProfileOrders,
  Register,
  ResetPassword,
} from "../../pages";
import AppHeader from "../AppHeader/AppHeader";
import Modal from "../Modal/Modal";
import OrderInfo from "../OrderInfo/OrderInfo";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import styles from "./App.module.css";

import { authCheckUserAction } from "../../services/actions/auth/auth";
import { ingredientsAction } from "../../services/actions/ingredients-action";
const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ingredientsAction());
    dispatch(authCheckUserAction());
  }, [dispatch]);

  const location = useLocation();
  const stateLocation = location.state && location.state.location;
  const item = location.state && location.state.item;
  useEffect(() => {
    dispatch({ type: INGREDIENTS_ACTIONS.SHOW_DETAILS, item: item });
  }, [dispatch, item]);

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <AppHeader />
      <div className={styles.main}>
        <Routes location={stateLocation || location}>
          <Route path={URL_ROOT} element={<MainPage />} />
          <Route path={URL_FEED} element={<FeedPage />} />
          <Route path={`${URL_INGREDIENTS}/:id`} element={<IngredientPage />} />
          <Route path={`${URL_FEED}/:id`} element={<OrderPage />} />
          <Route path={URL_LOGIN} element={<Login />} />
          <Route
            path={URL_REGISTER}
            element={<ProtectedRoute anonymous element={<Register />} />}
          />
          <Route
            path={URL_RESET_PASSWORD}
            element={<ProtectedRoute anonymous element={<ResetPassword />} />}
          />
          <Route
            path={URL_FORGOT_PASSWORD}
            element={<ProtectedRoute anonymous element={<ForgotPassword />} />}
          />
          <Route
            path={URL_PROFILE}
            element={<ProtectedRoute element={<Profile />} />}
          >
            <Route index element={<ProfileEdit />} />
            <Route path={URL_PROFILE_ORDERS} element={<ProfileOrders />} />
            <Route path={`${URL_PROFILE_ORDERS}/:id`} element={<OrderPage />} />
            <Route path={URL_PROFILE_LOGOUT} element={<ProfileLogout />} />
            <Route path={URL_ANY} element={<Page404 />} />
          </Route>
          <Route path={URL_ANY} element={<Page404 />} />
        </Routes>
        {stateLocation && (
          <Routes>
            <Route
              path={`${URL_FEED}/:id`}
              element={
                <Modal onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path={`${URL_PROFILE}/${URL_PROFILE_ORDERS}/:id`}
              element={
                <Modal onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
