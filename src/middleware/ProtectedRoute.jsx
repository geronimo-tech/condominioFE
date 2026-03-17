import { Navigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../services/auth";

const ProtectedRoute = ({ children, role }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  const user = getUser();

  if (role && user?.role !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;