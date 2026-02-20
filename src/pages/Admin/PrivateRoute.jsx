import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin");
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
