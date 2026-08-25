import { useMemo, useSyncExternalStore } from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

type ViewportState = {
  width: number;
  height: number;
};

type Viewport = ViewportState & {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isTabletUp: boolean;
  isDesktop: boolean;
};

const BREAKPOINTS = {
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400,
} as const;

let initialized = false;

let viewportState: ViewportState = {
  width: 0,
  height: 0,
};

const subscribers = new Set<() => void>();

function getBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS.XXL) return "xxl";
  if (width >= BREAKPOINTS.XL) return "xl";
  if (width >= BREAKPOINTS.LG) return "lg";
  if (width >= BREAKPOINTS.MD) return "md";
  if (width >= BREAKPOINTS.SM) return "sm";

  return "xs";
}

function notifySubscribers(): void {
  subscribers.forEach((subscriber) => {
    subscriber();
  });
}

function updateViewport(): void {
  const nextState: ViewportState = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  if (
    nextState.width === viewportState.width &&
    nextState.height === viewportState.height
  ) {
    return;
  }

  viewportState = nextState;

  notifySubscribers();
}

export function initViewport(): void {
  if (initialized || typeof window === "undefined") return;

  initialized = true;

  updateViewport();

  window.addEventListener("resize", updateViewport, { passive: true });
}

function subscribe(callback: () => void): () => void {
  subscribers.add(callback);

  initViewport();

  return () => {
    subscribers.delete(callback);
  };
}

function getSnapshot(): ViewportState {
  return viewportState;
}

function getServerSnapshot(): ViewportState {
  return {
    width: 0,
    height: 0,
  };
}

export function useViewport(): Viewport {
  const { width, height } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return useMemo<Viewport>(() => {
    return {
      width,
      height,
      breakpoint: getBreakpoint(width),
      isMobile: width < BREAKPOINTS.MD,
      isTablet: width >= BREAKPOINTS.MD && width < BREAKPOINTS.XXL,
      isTabletUp: width >= BREAKPOINTS.MD,
      isDesktop: width >= BREAKPOINTS.XXL,
    };
  }, [width, height]);
}
