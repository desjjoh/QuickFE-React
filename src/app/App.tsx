import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import styles from "./styles/App.module.scss";

function App(): React.JSX.Element {
  const contentRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    contentRef.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [pathname]);

  return (
    <div className={styles.appFrame}>
      <main ref={contentRef} className={styles.frameMain} data-app-shell-scroll>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
