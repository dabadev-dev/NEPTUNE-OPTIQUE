import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({
  children,
}: AdminRouteProps) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  const currentUser = JSON.parse(user);

  if (currentUser.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
