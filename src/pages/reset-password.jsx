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
import naming from "../data/ru.json";
import styles from "./page.module.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    token: "",
  });
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const { authLoading, authError, authSuccess, authLogIn, forgotPassword } =
    useSelector((state) => state.auth);

  const handlePasswordChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }, []);

  const handleTokenChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, token: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setWasSubmitted(true);
      dispatch(authResetPasswordAction(formData));
    },
    [dispatch, formData]
  );

  useEffect(() => {
    if (authLogIn) {
      navigate(URL_ROOT, { replace: true });
    } else if (!forgotPassword) {
      navigate(URL_FORGOT_PASSWORD, { replace: true });
    } else if (wasSubmitted && authError) {
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
      setWasSubmitted(false);
    } else if (wasSubmitted && authSuccess) {
      navigate(URL_LOGIN, { replace: true });
    }
  }, [
    dispatch,
    wasSubmitted,
    authLogIn,
    forgotPassword,
    authError,
    authSuccess,
    navigate,
  ]);

  const isSubmitDisabled = formData.password === "" || formData.token === "";

  return (
    <main className={styles.container}>
      <form className={styles.content} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">
          {naming.ResetPassword.passwordRecovery}
        </h1>

        <PasswordInput
          placeholder={naming.ResetPassword.newPassword}
          name="password"
          value={formData.password}
          onChange={handlePasswordChange}
          extraClass="mb-6"
        />

        <Input
          placeholder={naming.ResetPassword.code}
          name="token"
          value={formData.token}
          onChange={handleTokenChange}
          extraClass="mb-6"
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
            {naming.ResetPassword.save}
          </Button>
        )}

        <p className="text text_type_main-default text_color_inactive">
          {naming.ResetPassword.rememberPassword}{" "}
          <Link className={styles.link} to={URL_LOGIN}>
            {naming.ResetPassword.login}
          </Link>
        </p>
      </form>
    </main>
  );
};

export default ResetPassword;
