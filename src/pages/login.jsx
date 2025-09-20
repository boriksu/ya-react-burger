import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useState } from "react";
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
import {
  authGetUserAction,
  authLoginAction,
} from "../services/actions/auth/auth";
import { AUTH_ACTIONS } from "../services/actions/auth/auth-helper";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(authGetUserAction());
  }, [dispatch]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setWasSubmitted(true);
      dispatch(authLoginAction(formData));
    },
    [dispatch, formData]
  );

  const { requestStart, requestError, userLoggedIn } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (userLoggedIn) {
      const { from } = location.state || { from: { pathname: "/" } };
      if (from.pathname === `${URL_PROFILE}/${URL_PROFILE_LOGOUT}`) {
        from.pathname = URL_ROOT;
      }
      navigate(from.pathname, { replace: true });
    } else if (wasSubmitted && requestError) {
      alert(`[Вход] ${requestError}`);
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
      setWasSubmitted(false);
    }
  }, [
    dispatch,
    location.state,
    wasSubmitted,
    userLoggedIn,
    navigate,
    requestError,
  ]);

  const isFormValid = formData.email !== "" && formData.password !== "";

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={handleSubmit}>
        {requestStart || userLoggedIn ? (
          <Loader />
        ) : (
          <>
            <h1 className="text text_type_main-medium mb-6">Вход</h1>
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
            {requestStart ? (
              <Loader />
            ) : (
              <Button
                type="primary"
                extraClass="mb-20"
                htmlType="submit"
                disabled={!isFormValid}
              >
                Войти
              </Button>
            )}
            <p className="text text_type_main-default text_color_inactive mb-4">
              Вы — новый пользователь?
              <Link className="page-link" to={URL_REGISTER}>
                Зарегистрироваться
              </Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?
              <Link className="page-link" to={URL_FORGOT_PASSWORD}>
                Восстановить пароль
              </Link>
            </p>
          </>
        )}
      </form>
    </main>
  );
}

export default Login;
