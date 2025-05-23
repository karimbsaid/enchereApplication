import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";

const ProtectedRoute = ({ group }) => {
  const { user, isLoading, isTokenExpired, logout } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  const token = user?.token;
  if (!user || isTokenExpired(token)) {
    logout();
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
