import { createBrowserRouter } from "react-router-dom";
import { EmailVerificationPage } from "../pages/EmailVerificationPage";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/email-verification/:nik",
    Component: EmailVerificationPage,
  },
]);
