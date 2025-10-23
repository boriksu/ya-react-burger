import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { authPatchUserAction } from "../services/actions/auth/auth";
import { useDispatch, useSelector } from "../services/hook";

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../components/Loader/Loader";
import naming from "../data/ru.json";
import styles from "./page.module.css";

import { authGetUserAction } from "../services/actions/auth/auth";
import { getAuth } from "../services/selectors";

const ProfileEdit = () => {
  const dispatch = useDispatch();

  const { authLoading, authSuccess, authError, user } = useSelector(getAuth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [nameDisabled, setNameDisabled] = useState(true);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(authGetUserAction() as any);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  }, []);

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
      setNameDisabled(true);
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
      setNameDisabled(true);
    },
    [user]
  );

  const nameClick = useCallback(() => {
    setNameDisabled(false);
    setTimeout(() => {
      nameRef.current?.focus();
    }, 0);
  }, []);

  useEffect(() => {
    if (authSuccess && wasSubmitted) {
      setFormData((prev) => ({ ...prev, password: "" }));
      setWasSubmitted(false);
    }
  }, [authSuccess, wasSubmitted]);

  const hasChanges =
    user &&
    (formData.name !== user.name ||
      formData.email !== user.email ||
      formData.password.length > 0);

  return (
    <div className={styles.containerRight}>
      {!!authError && wasSubmitted && (
        <p className={`mb-2 error-text text text_type_main-default`}>
          {authError}
        </p>
      )}
      <form
        className={styles.content}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <Input
          extraClass="mb-6"
          name="name"
          placeholder={naming.ProfileEdit.name}
          value={formData.name}
          onChange={handleNameChange}
          icon="EditIcon"
          disabled={nameDisabled}
          onIconClick={nameClick}
          ref={nameRef}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
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
    </div>
  );
};

export default ProfileEdit;
