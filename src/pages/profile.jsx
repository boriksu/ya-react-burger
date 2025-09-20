import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import {
  URL_LOGIN,
  URL_PROFILE_LOGOUT,
  URL_PROFILE_ORDERS,
} from "../data/routes";
import naming from "../data/ru.json";
import { authGetUserAction } from "../services/actions/auth/auth";
import styles from "./page.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authLoading, user } = useSelector((state) => state.auth);

  const navLinkClass = ({ isActive }) =>
    `text text_type_main-medium ${
      isActive ? "text_color_primary" : "text_color_inactive"
    }`;

  useEffect(() => {
    if (!user.name) {
      const action = authGetUserAction();
      dispatch(action);
    }
  }, [dispatch, user.name]);

  useEffect(() => {
    if (!authLoading && !user.name) {
      navigate(URL_LOGIN, { replace: true });
    }
  }, [authLoading, user.name, navigate]);

  if (authLoading || !user.name) {
    return <Loader />;
  }

  return (
    <main className={`${styles.container} ${styles.containerProfile} `}>
      <div className={styles.containerProfileContent}>
        <nav className={`${styles.menu} ml-5 mr-15 `}>
          <ul>
            <li>
              <NavLink to="" end className={navLinkClass}>
                {naming.Profile.profile}
              </NavLink>
            </li>
            <li>
              <NavLink to={URL_PROFILE_ORDERS} className={navLinkClass}>
                {naming.Profile.history}
              </NavLink>
            </li>
            <li>
              <NavLink to={URL_PROFILE_LOGOUT} className={navLinkClass}>
                {naming.Profile.exit}
              </NavLink>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_dark mt-20">
            {naming.Profile.changeProfileData}
          </p>
        </nav>

        <Outlet />
      </div>
    </main>
  );
};

export default Profile;
