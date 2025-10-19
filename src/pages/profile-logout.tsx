import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../data/routes";
import { authLogoutAction } from "../services/actions/auth/auth";
import { useDispatch, useSelector } from "../services/hook";

import naming from "../data/ru.json";

import { getAuth } from "../services/selectors";
import styles from "./page.module.css";

const ProfileLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authError, authSuccess, authLogIn } = useSelector(getAuth);
  const [logoutStarted, setLogoutStarted] = useState(false);

  useEffect(() => {
    if (authLogIn && !logoutStarted) {
      dispatch(authLogoutAction());
      setLogoutStarted(true);
    } else {
      navigate(URL_LOGIN, { replace: true });
    }
  }, [dispatch, authLogIn, logoutStarted, navigate]);

  useEffect(() => {
    if (logoutStarted && authSuccess) {
      navigate(URL_LOGIN, { replace: true });
    }
  }, [dispatch, logoutStarted, authError, authSuccess, navigate]);

  return (
    <div className={styles.content}>
      {!!authError && (
        <p className={`mb-2 error-text text text_type_main-default`}>
          {authError}
        </p>
      )}
      {logoutStarted && (
        <p className="text text_type_main-default text_color_inactive">
          {naming.ProfileLogout.logout}
        </p>
      )}
    </div>
  );
};

export default ProfileLogout;
