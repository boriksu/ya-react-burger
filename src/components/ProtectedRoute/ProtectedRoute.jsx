import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../../data/routes";
import { authGetUserAction } from "../../services/actions/auth/auth";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authLoading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user.name) {
      const action = authGetUserAction();
      dispatch(action);
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
