import {
  createBrowserRouter
} from "react-router-dom";
import Home from "../containets/pages/Home"
import Error404 from "../containets/errors/Error404"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
