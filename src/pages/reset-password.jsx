import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { authResetPasswordAction } from "../services/actions/auth/auth";
import { AUTH_ACTIONS } from "../services/actions/auth/auth-helper";

import { URL_FORGOT_PASSWORD, URL_LOGIN, URL_ROOT } from "../data/routes";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../components/Loader/Loader";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    token: "",
  });
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const {
    requestStart,
    requestError,
    requestSuccess,
    userLoggedIn,
    forgotPassword,
  } = useSelector((state) => state.auth);

  // Обработчики изменений полей
  const handlePasswordChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }, []);

  const handleTokenChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, token: e.target.value }));
  }, []);

  // Отправка формы
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setWasSubmitted(true);
      dispatch(authResetPasswordAction(formData));
    },
    [dispatch, formData]
  );

  // Проверки и перенаправления
  useEffect(() => {
    if (userLoggedIn) {
      navigate(URL_ROOT, { replace: true });
    } else if (!forgotPassword) {
      navigate(URL_FORGOT_PASSWORD, { replace: true });
    } else if (wasSubmitted && requestError) {
      alert(`[Сброс пароля] ${requestError}`);
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
      setWasSubmitted(false);
    } else if (wasSubmitted && requestSuccess) {
      navigate(URL_LOGIN, { replace: true });
    }
  }, [
    dispatch,
    wasSubmitted,
    userLoggedIn,
    forgotPassword,
    requestError,
    requestSuccess,
    navigate,
  ]);

  const isSubmitDisabled = formData.password === "" || formData.token === "";

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>

        <PasswordInput
          placeholder="Введите новый пароль"
          name="password"
          value={formData.password}
          onChange={handlePasswordChange}
          extraClass="mb-6"
        />

        <Input
          placeholder="Введите код из письма"
          name="token"
          value={formData.token}
          onChange={handleTokenChange}
          extraClass="mb-6"
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
            Сохранить
          </Button>
        )}

        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link className="page-link" to={URL_LOGIN}>
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
}

export default ResetPassword;
