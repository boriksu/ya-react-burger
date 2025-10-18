import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../services/hook";
import { getAuth } from "../../services/selectors";

type TProps = {
  element: React.ReactElement;
  anonymous?: boolean;
};

const ProtectedRoute: FC<TProps> = ({ element, anonymous = false }) => {
  const { authLogIn } = useSelector(getAuth);
  const location = useLocation();

  const from = location.state?.from || "/";

  // Если разрешен неавторизованный доступ, а пользователь авторизован
  if (anonymous && authLogIn) {
    // то отправляем его на предыдущую страницу
    return <Navigate to={from} replace />;
  }

  // Если требуется авторизация, а пользователь не авторизован
  if (!anonymous && !authLogIn) {
    // то отправляем его на страницу логина
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
};

export default ProtectedRoute;
