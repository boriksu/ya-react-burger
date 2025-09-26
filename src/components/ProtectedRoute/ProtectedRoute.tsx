import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../../data/routes";
import { authGetUserAction } from "../../services/actions/auth/auth";
import { getAuth } from "../../services/selectors";
import Loader from "../Loader/Loader";

type TProps = {
  children: React.ReactElement;
};

const ProtectedRoute: FC<TProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authLoading, user } = useSelector(getAuth);

  useEffect(() => {
    if (!user.name) {
      dispatch(authGetUserAction() as any);
    }
  }, [dispatch, user.name]);

  useEffect(() => {
    if (!authLoading && !user.name) {
      navigate(URL_LOGIN, { replace: true });
    }
  }, [authLoading, user.name, navigate]);

  if (authLoading || !user.name) {
    return <Loader />;
  }

  return children;
};

export default ProtectedRoute;
