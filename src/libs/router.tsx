import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";

export const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    Component: LandingPage,
  },
]);
