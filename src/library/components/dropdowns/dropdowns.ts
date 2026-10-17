import type { ReactNode } from "react";

export type Side = "top" | "bottom";
export type Align = "start" | "center" | "end";
export type Tone = "success" | "warning" | "danger" | "info";
export type CloseOptions = { restoreFocus?: boolean };
export type DropdownMenuContextValue = {
  focusTrigger: () => void;
  focusMenu: () => void;
  requestItemFocus: (item: HTMLElement) => void;
  close: (options?: CloseOptions) => void;
};
export type TriggerAttrs = {
  "aria-haspopup": "menu";
  "aria-expanded": "true" | "false";
  "aria-controls": string;
};
export type TriggerControls = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: (options?: CloseOptions) => void;
  triggerAttrs: TriggerAttrs;
};
export type DropdownProps = {
  closeOnSelect?: boolean;
  disabled?: boolean;
  side?: Side;
  contentAlign?: Align;
  sideOffset?: number;
  alignOffset?: number;
  matchTriggerWidth?: boolean;
  collisionPadding?: number;
  avoidCollisions?: boolean;
  keepMounted?: boolean;
  trigger: (controls: TriggerControls) => ReactNode;
  children: ReactNode | ((controls: Pick<DropdownMenuContextValue, "close">) => ReactNode);
};
