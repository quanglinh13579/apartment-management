import { Navigate, useRoutes } from "react-router-dom";
import RoleSelection from "../pages/RoleSelection/RoleSelection";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Verification from "../pages/Verification/Verification";

const AppRouter = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <Navigate to="/role-selection" replace />,
    },
    {
      path: "/role-selection",
      element: <RoleSelection />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/verification",
      element: <Verification />,
    },
  ]);

  return elements;
};

export default AppRouter;
