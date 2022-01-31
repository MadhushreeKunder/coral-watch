import { useAuth } from "../contexts";
import { Route, Navigate } from "react-router";

export const PrivateRoute = ({ path, ...props }) => {
  const { token } = useAuth();
  return token ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate replace state={{ from: path }} to="/login" />
  );
};
