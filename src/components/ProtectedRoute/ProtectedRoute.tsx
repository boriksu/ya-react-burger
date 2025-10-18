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

  if (anonymous && authLogIn) {
    return <Navigate to={from} replace />;
  }

  if (!anonymous && !authLogIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
