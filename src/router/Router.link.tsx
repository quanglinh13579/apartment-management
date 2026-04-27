import { Navigate, useRoutes } from "react-router-dom";
import RoleSelectionPage from "../pages/auth/RoleSelectionPage";
import SignUpPage from "../pages/auth/SignUpPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerificationPage from "../pages/auth/VerificationPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import SignInPage from "../pages/auth/SignInPage";

const AppRouter = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <Navigate to="/role-selection" replace />,
    },
    {
      path: "/role-selection",
      element: <RoleSelectionPage />,
    },
    {
      path: "/login",
      element: <SignInPage />,
    },
    {
      path: "/sign-up",
      element: <SignUpPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/verification",
      element: <VerificationPage />,
    },
    {
      path: "/reset-password",
      element: <ResetPasswordPage />,
    },
  ]);

  return elements;
};

export default AppRouter;
