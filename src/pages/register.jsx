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
import naming from "../data/ru.json";
import styles from "./page.module.css";

const Register = () => {
  console.log("authRegisterAction is:", typeof authRegisterAction);
  console.log("authRegisterAction:", authRegisterAction);
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

  const handleNameChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  }, []);

  const handleEmailChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // console.log("✅ Form submitted, dispatching authRegisterAction");
      setWasSubmitted(true);

      const action = authRegisterAction(formData);
      // console.log("🔄 Action created:", action);
      // console.log("Type of action:", typeof action);

      dispatch(action);
    },
    [dispatch, formData]
  );

  const { authLoading, authError, authSuccess, authLogIn } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   if (authLogIn) {
  //     navigate(URL_ROOT, { replace: true });
  //   } else if (wasSubmitted && authError) {
  //     dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
  //     setWasSubmitted(false);
  //   }
  // }, [dispatch, wasSubmitted, authLogIn, navigate, authError]);

  useEffect(() => {
    if (authLogIn) {
      navigate(URL_ROOT, { replace: true });
    } else if (wasSubmitted && authError) {
      alert(`Ошибка регистрации: ${authError}`);
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
      setWasSubmitted(false);
    } else if (wasSubmitted && authSuccess) {
      // Успешная регистрация
      alert("Регистрация успешна! Выполняется вход...");
      dispatch(authGetUserAction());
    }
  }, [dispatch, wasSubmitted, authLogIn, authError, authSuccess, navigate]);

  const isSubmitDisabled =
    formData.name === "" || formData.email === "" || formData.password === "";

  return (
    <main className={styles.container}>
      <form className={styles.content} onSubmit={handleSubmit}>
        {authLoading || authLogIn ? (
          <Loader />
        ) : (
          <>
            <h1 className="text text_type_main-medium mb-6">
              {naming.Register.registry}
            </h1>

            <Input
              placeholder={naming.Register.name}
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

            {authLoading ? (
              <Loader />
            ) : (
              <Button
                type="primary"
                extraClass="mb-20"
                htmlType="submit"
                disabled={isSubmitDisabled}
              >
                {naming.Register.register}
              </Button>
            )}

            <p className="text text_type_main-default text_color_inactive mb-4">
              {naming.Register.alreadyRedister}{" "}
              <Link className={styles.link} to={URL_LOGIN}>
                {naming.Register.login}
              </Link>
            </p>
          </>
        )}
      </form>
    </main>
  );
};

export default Register;
