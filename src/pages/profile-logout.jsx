import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../data/routes";
import { authLogoutAction } from "../services/actions/auth/auth";
import { AUTH_ACTIONS } from "../services/actions/auth/auth-helper";

import Loader from "../components/Loader/Loader";
import styles from "./page.module.css";

const ProfileLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authError, authSuccess, authLogIn } = useSelector(
    (state) => state.auth
  );
  const [logoutStarted, setLogoutStarted] = useState(false);

  useEffect(() => {
    // Выходим только если пользователь был авторизован И выход еще не начат
    if (authLogIn && !logoutStarted) {
      console.log("Starting logout process");
      setLogoutStarted(true);
      dispatch(authLogoutAction());
    }

    // Если пользователь уже не авторизован, перенаправляем сразу
    if (!authLogIn && !logoutStarted) {
      console.log("User already logged out, redirecting");
      navigate(URL_LOGIN, { replace: true });
    }
  }, [authLogIn, logoutStarted, dispatch, navigate]);

  useEffect(() => {
    if (logoutStarted && authError) {
      console.error("Logout error:", authError);
      // При ошибке выхода все равно очищаем и перенаправляем
      localStorage.removeItem("refreshToken");
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
      navigate(URL_LOGIN, { replace: true });
    }

    if (logoutStarted && authSuccess) {
      console.log("Logout successful, redirecting");
      navigate(URL_LOGIN, { replace: true });
    }
  }, [dispatch, logoutStarted, authError, authSuccess, navigate]);

  // Если пользователь не авторизован, показываем ничего или редирект
  if (!authLogIn) {
    return null;
  }

  return (
    <div className={styles.content}>
      {logoutStarted && <Loader />}
      {authError && (
        <div className={styles.error}>Ошибка при выходе: {authError}</div>
      )}
    </div>
  );
};

export default ProfileLogout;
