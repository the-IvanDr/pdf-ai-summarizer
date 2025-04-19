import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home/home.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
