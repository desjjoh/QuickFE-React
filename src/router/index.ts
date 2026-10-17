import { createBrowserRouter } from "react-router-dom";

import AppFrame from "@/app/AppFrame";
import { routes } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppFrame,
    children: routes,
  },
]);
