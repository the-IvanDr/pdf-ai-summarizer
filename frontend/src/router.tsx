import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home/home.page";
import { MainLayout } from "./layouts/MainLayout";

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [{ index: true, Component: Home }],
  },
]);
