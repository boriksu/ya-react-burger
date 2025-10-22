import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL_LOGIN, URL_RESET_PASSWORD, URL_ROOT } from "../data/routes";
import {
  authForgotPasswordAction,
  authGetUserAction,
} from "../services/actions/auth/auth";
import { useDispatch, useSelector } from "../services/hook";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../components/Loader/Loader";
import naming from "../data/ru.json";
import styles from "./page.module.css";

import { getAuth } from "../services/selectors";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(authGetUserAction());
  }, [dispatch]);

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setWasSubmitted(true);
      dispatch(authForgotPasswordAction({ email }));
    },
    [dispatch, email]
  );

  const { authLoading, authError, authSuccess, authLogIn } =
    useSelector(getAuth);

  useEffect(() => {
    if (authLogIn) {
      navigate(URL_ROOT, { replace: true });
    } else if (wasSubmitted && authSuccess) {
      navigate(URL_RESET_PASSWORD, { replace: true });
    }
  }, [dispatch, wasSubmitted, authLogIn, authError, authSuccess, navigate]);

  const isSubmitDisabled = email === "";

  return (
    <main className={styles.container}>
      <form className={styles.content} onSubmit={handleSubmit}>
        {authLoading || authLogIn ? (
          <Loader />
        ) : (
          <>
            {!!authError && wasSubmitted && (
              <p className={`mb-2 error-text text text_type_main-default`}>
                {authError}
              </p>
            )}
            <h1 className="text text_type_main-medium mb-6 mt-10">
              {naming.ForgotPassword.passwordRecovery}
            </h1>
            <EmailInput
              extraClass="mb-6"
              placeholder={naming.ForgotPassword.enterEmail}
              name="email"
              value={email}
              onChange={handleEmailChange}
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
                {naming.ForgotPassword.recover}
              </Button>
            )}
            <p className="text text_type_main-default text_color_inactive">
              {naming.ForgotPassword.rememberPassword}{" "}
              <Link className={styles.link} to={URL_LOGIN}>
                {naming.ForgotPassword.login}
              </Link>
            </p>
          </>
        )}
      </form>
    </main>
  );
};

export default ForgotPassword;
