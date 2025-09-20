import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import {
  URL_LOGIN,
  URL_PROFILE_LOGOUT,
  URL_PROFILE_ORDERS,
} from "../data/routes";
import { authGetUserAction } from "../services/actions/auth/auth";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requestStart, user } = useSelector((state) => state.auth);

  const navLinkClass = ({ isActive }) =>
    `text text_type_main-medium ${
      isActive ? "text_color_primary" : "text_color_inactive"
    }`;

  // // Проверяем авторизацию при монтировании
  // useEffect(() => {
  //   if (!user.name) {
  //     dispatch(authGetUserAction());
  //   }
  // }, [dispatch, user.name]);

  useEffect(() => {
    if (!user.name) {
      // authGetUserAction - это уже функция, которую нужно вызвать
      const action = authGetUserAction(); // ← Добавьте скобки!
      dispatch(action);
    }
  }, [dispatch, user.name]);

  // Перенаправляем если пользователь не авторизован
  useEffect(() => {
    if (!requestStart && !user.name) {
      navigate(URL_LOGIN, { replace: true });
    }
  }, [requestStart, user.name, navigate]);

  // Показываем лоадер пока проверяем авторизацию
  if (requestStart || !user.name) {
    return <Loader />;
  }

  return (
    <main className="page-container page-container-profile">
      <div className="page-container-profile-wrapper">
        <nav className="page-container-profile-sidebar ml-5 mr-15">
          <ul>
            <li>
              <NavLink to="" end className={navLinkClass}>
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink to={URL_PROFILE_ORDERS} className={navLinkClass}>
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink to={URL_PROFILE_LOGOUT} className={navLinkClass}>
                Выход
              </NavLink>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_dark mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>

        <Outlet />
      </div>
    </main>
  );
}

export default Profile;
