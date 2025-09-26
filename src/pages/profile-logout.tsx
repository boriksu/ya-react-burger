import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../data/routes";
import { authLogoutAction } from "../services/actions/auth/auth";
import { AUTH_ACTIONS } from "../services/actions/auth/auth-helper";

import Loader from "../components/Loader/Loader";
import { getAuth } from "../services/selectors";
import styles from "./page.module.css";

const ProfileLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authError, authSuccess, authLogIn } = useSelector(getAuth);
  const [logoutStarted, setLogoutStarted] = useState(false);

  useEffect(() => {
    if (authLogIn && !logoutStarted) {
      dispatch(authLogoutAction() as any);
      setLogoutStarted(true);
    }
  }, [authLogIn, logoutStarted, dispatch]);

  useEffect(() => {
    if (logoutStarted && authError) {
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
      setLogoutStarted(false);
    } else if (logoutStarted && authSuccess) {
      navigate(URL_LOGIN, { replace: true });
    }
  }, [dispatch, logoutStarted, authError, authSuccess, navigate]);

  return <div className={styles.content}>{logoutStarted && <Loader />}</div>;
};

export default ProfileLogout;
