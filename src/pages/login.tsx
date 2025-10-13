import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import {
  URL_FORGOT_PASSWORD,
  URL_PROFILE,
  URL_PROFILE_LOGOUT,
  URL_REGISTER,
  URL_ROOT,
} from "../data/routes";
import naming from "../data/ru.json";
import {
  authGetUserAction,
  authLoginAction,
} from "../services/actions/auth/auth";
import { AUTH_ACTIONS } from "../services/actions/auth/auth-helper";
import styles from "./page.module.css";

import { getAuth } from "../services/selectors";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(authGetUserAction() as any);
  }, [dispatch]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setWasSubmitted(true);
      dispatch(authLoginAction(formData) as any);
    },
    [dispatch, formData]
  );

  const { authLoading, authError, authLogIn } = useSelector(getAuth);

  useEffect(() => {
    if (authLogIn) {
      const { from } = location.state || { from: { pathname: "/" } };
      if (from.pathname === `${URL_PROFILE}/${URL_PROFILE_LOGOUT}`) {
        from.pathname = URL_ROOT;
      }
      navigate(from.pathname, { replace: true });
    } else if (wasSubmitted && authError) {
      alert(`[Вход] ${authError}`);
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
      setWasSubmitted(false);
    }
  }, [dispatch, location.state, wasSubmitted, authLogIn, navigate, authError]);

  const isFormValid = formData.email !== "" && formData.password !== "";

  return (
    <main className={styles.container}>
      <form className={styles.content} onSubmit={handleSubmit}>
        {authLoading || authLogIn ? (
          <Loader />
        ) : (
          <>
            <h1 className="text text_type_main-medium mb-6">
              {naming.Login.entry}
            </h1>
            <EmailInput
              extraClass="mb-6"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <PasswordInput
              extraClass="mb-6"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {authLoading ? (
              <Loader />
            ) : (
              <Button
                type="primary"
                extraClass="mb-20"
                htmlType="submit"
                disabled={!isFormValid}
              >
                {naming.Login.login}
              </Button>
            )}
            <p className="text text_type_main-default text_color_inactive mb-4">
              {naming.Login.newUser}{" "}
              <Link className={styles.link} to={URL_REGISTER}>
                {naming.Login.register}
              </Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {naming.Login.fogetPassword}{" "}
              <Link className={styles.link} to={URL_FORGOT_PASSWORD}>
                {naming.Login.recoverPassword}
              </Link>
            </p>
          </>
        )}
      </form>
    </main>
  );
};

export default Login;
