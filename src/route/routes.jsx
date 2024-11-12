import {
  createBrowserRouter
} from "react-router-dom";
import Home from "../containets/pages/Home"
import Error404 from "../containets/errors/Error404"

import { authRoutes } from "./auth-routes";

import UserProfile from "../containets/pages/UserProfile";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/UserProfile",
    element: <UserProfile />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
  {
    path: "auth/",
    children: authRoutes
  }
]);
