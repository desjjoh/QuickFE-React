import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "@/library/components/navbar/NavBar";
import { useViewport } from "@/shared/hooks/useViewport";

import styles from "./styles/AppFrame.module.scss";

function AppFrame(): React.JSX.Element {
  const contentRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const { isDesktop } = useViewport();

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
        <header className={styles.frameHeader}>
          <NavBar centered={!isDesktop} />
        </header>
        <Outlet />
      </main>
    </div>
  );
}

export default AppFrame;
