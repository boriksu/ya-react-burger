import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  authGetUserAction,
  authRegisterAction,
} from "../services/actions/auth/auth";
import { AUTH_ACTIONS } from "../services/actions/auth/auth-helper";

import { URL_LOGIN, URL_ROOT } from "../data/routes";

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../components/Loader/Loader";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(authGetUserAction());
  }, [dispatch]);

  // Обработчики изменений полей
  const handleNameChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  }, []);

  const handleEmailChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }, []);

  // Отправка формы
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setWasSubmitted(true);
      dispatch(authRegisterAction(formData));
    },
    [dispatch, formData]
  );

  const { requestStart, requestError, userLoggedIn } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (userLoggedIn) {
      navigate(URL_ROOT, { replace: true });
    } else if (wasSubmitted && requestError) {
      alert(`[Регистрация] ${requestError}`);
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
      setWasSubmitted(false);
    }
  }, [dispatch, wasSubmitted, userLoggedIn, navigate, requestError]);

  const isSubmitDisabled =
    formData.name === "" || formData.email === "" || formData.password === "";

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={handleSubmit}>
        {requestStart || userLoggedIn ? (
          <Loader />
        ) : (
          <>
            <h1 className="text text_type_main-medium mb-6">Регистрация</h1>

            <Input
              placeholder="Имя"
              extraClass="mb-6"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
            />

            <EmailInput
              extraClass="mb-6"
              name="email"
              value={formData.email}
              onChange={handleEmailChange}
            />

            <PasswordInput
              extraClass="mb-6"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
            />

            {requestStart ? (
              <Loader />
            ) : (
              <Button
                type="primary"
                extraClass="mb-20"
                htmlType="submit"
                disabled={isSubmitDisabled}
              >
                Зарегистрироваться
              </Button>
            )}

            <p className="text text_type_main-default text_color_inactive mb-4">
              Уже зарегистрированы?{" "}
              <Link className="page-link" to={URL_LOGIN}>
                Войти
              </Link>
            </p>
          </>
        )}
      </form>
    </main>
  );
}

export default Register;
