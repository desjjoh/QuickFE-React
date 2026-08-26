import { createBrowserRouter } from "react-router-dom";

import App from "@/app/App";
import { Template } from "@/views";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Template,
      },
    ],
  },
]);
