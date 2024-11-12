import {
  createBrowserRouter
} from "react-router-dom";
import Home from "../containets/pages/Home"
import Error404 from "../containets/errors/Error404"
import { authRoutes } from "./auth-routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
