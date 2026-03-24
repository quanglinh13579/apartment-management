import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants/Index";
import RoleSelection from "../pages/RoleSelection/RoleSelection";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROLE_SELECTION} element={<RoleSelection />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.ROLE_SELECTION} replace />} />
    </Routes>
  );
};

export default AppRouter;
