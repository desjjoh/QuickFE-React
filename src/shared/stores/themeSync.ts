import type { AppStore } from "./index";
import { setMode, type ThemeMode } from "./theme.ts";

const STORAGE_KEY = "theme_mode";
const CHANNEL_NAME = "quickfe-theme";

function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark";
}

function getInitialMode(): ThemeMode {
  const documentMode = document.documentElement.dataset.theme;
  if (isThemeMode(documentMode)) return documentMode;

  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
    if (isThemeMode(saved)) return saved;
  } catch {
    // A missing/blocked storage area or invalid saved value must not prevent startup.
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyMode(mode: ThemeMode): void {
  document.documentElement.dataset.theme = mode;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mode));
  } catch {
    // Theme changes still work when browser storage is unavailable.
  }
}

// Browser effects live outside reducers and run before React mounts, as in Vue.
export function initializeTheme(store: AppStore): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};

  const mode = getInitialMode();
  store.dispatch(setMode(mode));
  applyMode(mode);

  const source = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36);
  let channel: BroadcastChannel | null = null;
  try {
    if ("BroadcastChannel" in window) channel = new window.BroadcastChannel(CHANNEL_NAME);
  } catch {
    // Cross-tab synchronization is optional when the browser blocks it.
  }

  let currentMode = mode;
  let receiving = false;
  const unsubscribe = store.subscribe(() => {
    const nextMode = store.getState().theme.mode;
    if (nextMode === currentMode) return;
    currentMode = nextMode;
    applyMode(nextMode);
    if (!receiving) channel?.postMessage({ type: "theme:changed", source, mode: nextMode });
  });

  const onMessage = (event: MessageEvent<unknown>): void => {
    const message = event.data;
    if (typeof message !== "object" || message === null || !("type" in message) || !("source" in message) || !("mode" in message)) return;
    if (message.type !== "theme:changed" || message.source === source || !isThemeMode(message.mode)) return;

    receiving = true;
    try {
      store.dispatch(setMode(message.mode));
    } finally {
      receiving = false;
    }
  };
  channel?.addEventListener("message", onMessage);

  return () => {
    unsubscribe();
    channel?.removeEventListener("message", onMessage);
    channel?.close();
  };
}
