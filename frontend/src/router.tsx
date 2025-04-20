import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home/home.page";
import { MainLayout } from "./layouts/MainLayout";
import { SummaryPage } from "./pages/summary/summary.page";

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/summary/:summaryId", Component: SummaryPage },
    ],
  },
]);
