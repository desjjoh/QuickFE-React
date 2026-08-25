import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/library/styles/styles.scss";
import App from "@/views/template/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
