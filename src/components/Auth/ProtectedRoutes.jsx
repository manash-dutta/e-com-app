import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/authContext";

const ProtectedRoutes = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes