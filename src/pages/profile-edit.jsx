import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authPatchUserAction } from "../services/actions/auth/auth";
import { AUTH_ACTIONS } from "../services/actions/auth/auth-helper";

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../components/Loader/Loader";

function ProfileEdit() {
  const dispatch = useDispatch();

  const { requestStart, requestError, requestSuccess, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Инициализация формы данными пользователя
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

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
      dispatch(authPatchUserAction(formData));
    },
    [dispatch, formData]
  );

  // Сброс формы к исходным значениям
  const handleReset = useCallback(
    (e) => {
      e.preventDefault();
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
      });
    },
    [user]
  );

  // Проверка, были ли изменения
  const hasChanges =
    user &&
    (formData.name !== user.name ||
      formData.email !== user.email ||
      formData.password.length > 0);

  // Обработка ошибок и успешных операций
  useEffect(() => {
    if (requestError) {
      alert(`[Профиль сохранение] ${requestError}`);
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
    }

    // После успешного сохранения сбрасываем пароль
    if (requestSuccess) {
      setFormData((prev) => ({ ...prev, password: "" }));
    }
  }, [dispatch, requestError, requestSuccess]);

  return (
    <form
      className="page-container-inner"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <Input
        extraClass="mb-6"
        name="name"
        placeholder="Имя"
        value={formData.name}
        onChange={handleNameChange}
        icon="EditIcon"
      />
      <EmailInput
        extraClass="mb-6"
        name="email"
        value={formData.email}
        onChange={handleEmailChange}
        icon="EditIcon"
      />
      <PasswordInput
        extraClass="mb-6"
        name="password"
        value={formData.password}
        onChange={handlePasswordChange}
        icon="EditIcon"
        placeholder="Новый пароль"
      />

      {requestStart ? (
        <Loader />
      ) : hasChanges ? (
        <div>
          <Button type="primary" htmlType="reset">
            Отмена
          </Button>
          <Button type="primary" extraClass="ml-5" htmlType="submit">
            Сохранить
          </Button>
        </div>
      ) : null}
    </form>
  );
}

export default ProfileEdit;
