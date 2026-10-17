import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "@/App";
import { store } from "@/shared/stores";
import { initializeTheme } from "@/shared/stores/themeSync";
import "@/library/styles/styles.scss";
import "@/shared/i18n";

const stopThemeSync = initializeTheme(store);
import.meta.hot?.dispose(stopThemeSync);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
