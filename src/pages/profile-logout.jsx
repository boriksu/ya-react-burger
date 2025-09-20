import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../data/routes";
import { authLogoutAction } from "../services/actions/auth/auth";
import { AUTH_ACTIONS } from "../services/actions/auth/auth-helper";

import Loader from "../components/Loader/Loader";

function ProfileLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { requestError, requestSuccess, userLoggedIn } = useSelector(
    (state) => state.auth
  );
  const [logoutStarted, setLogoutStarted] = useState(false);

  // Запуск выхода при монтировании, если пользователь авторизован
  useEffect(() => {
    if (userLoggedIn && !logoutStarted) {
      dispatch(authLogoutAction());
      setLogoutStarted(true);
    }
  }, [userLoggedIn, logoutStarted, dispatch]);

  // Обработка результатов выхода
  useEffect(() => {
    if (logoutStarted && requestError) {
      alert(`[Выход] ${requestError}`);
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
      setLogoutStarted(false);
    } else if (logoutStarted && requestSuccess) {
      navigate(URL_LOGIN, { replace: true });
    }
  }, [dispatch, logoutStarted, requestError, requestSuccess, navigate]);

  return (
    <div className="page-container-inner">{logoutStarted && <Loader />}</div>
  );
}

export default ProfileLogout;
