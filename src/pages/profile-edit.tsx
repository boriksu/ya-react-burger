// FIXME
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { authPatchUserAction } from "../services/actions/auth/auth";
import { AUTH_ACTIONS } from "../services/actions/auth/auth-helper";

import {
  Button,
  EmailInput,
  // Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../components/Loader/Loader";
import naming from "../data/ru.json";
import styles from "./page.module.css";

import { getAuth } from "../services/selectors";

const ProfileEdit = () => {
  const dispatch = useDispatch();

  const { authLoading, authError, authSuccess, user } = useSelector(getAuth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  // const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   setFormData((prev) => ({ ...prev, name: e.target.value }));
  // }, []);

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  }, []);

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, password: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(authPatchUserAction(formData) as any);
    },
    [dispatch, formData]
  );

  const handleReset = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
      });
    },
    [user]
  );

  const hasChanges =
    user &&
    (formData.name !== user.name ||
      formData.email !== user.email ||
      formData.password.length > 0);

  useEffect(() => {
    if (authError) {
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
    }

    if (authSuccess) {
      setFormData((prev) => ({ ...prev, password: "" }));
    }
  }, [dispatch, authError, authSuccess]);

  // const [nameDisabled, setNameDisabled] = useState<boolean>(true);
  // const nameRef = useRef<HTMLInputElement>(null);

  // const nameClick = useCallback(() => {
  //   setNameDisabled(false);
  //   setTimeout(() => {
  //     nameRef.current?.focus();
  //   }, 0);
  // }, [setNameDisabled, nameRef]);

  return (
    <form
      className={styles.content}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {/* <Input
        extraClass="mb-6"
        name="name"
        placeholder={naming.ProfileEdit.name}
        value={formData.name}
        onChange={handleNameChange}
        icon="EditIcon"
        disabled={nameDisabled}
        onIconClick={nameClick}
        ref={nameRef}
      /> */}
      <EmailInput
        extraClass="mb-6"
        name="email"
        value={formData.email}
        onChange={handleEmailChange}
        isIcon
      />
      <PasswordInput
        extraClass="mb-6"
        name="password"
        value={formData.password}
        onChange={handlePasswordChange}
        icon="EditIcon"
        placeholder={naming.ProfileEdit.newPassword}
      />

      {authLoading ? (
        <Loader />
      ) : hasChanges ? (
        <div>
          <Button type="primary" htmlType="reset">
            {naming.ProfileEdit.cancel}
          </Button>
          <Button type="primary" extraClass="ml-5" htmlType="submit">
            {naming.ProfileEdit.save}
          </Button>
        </div>
      ) : null}
    </form>
  );
};

export default ProfileEdit;
