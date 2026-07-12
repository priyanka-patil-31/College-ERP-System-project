import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";

function AuthGuard() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }
  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard />
    </AuthProvider>
  );
}
