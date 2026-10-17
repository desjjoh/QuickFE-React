import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { createFocusTrap, type FocusTrap } from "focus-trap";

import { useFloatingOverlay } from "@/shared/hooks/useFloatingOverlay";
import { useDismissableLayer } from "@/shared/hooks/useDismissableLayer";
import { DropdownContext } from "./DropdownContext";
import { DropdownContentSlot, DropdownTriggerSlot } from "./DropdownSlots";
import type { CloseOptions, DropdownProps, TriggerAttrs } from "./dropdowns";
import styles from "./Dropdown.module.scss";

function blockOutsideKeydown(event: globalThis.KeyboardEvent): void {
  event.preventDefault();
  event.stopPropagation();
}

export function BaseDropdown({
  closeOnSelect = true, disabled = false, side = "bottom", contentAlign = "start",
  sideOffset = 8, alignOffset = 0, matchTriggerWidth = false, collisionPadding = 8,
  avoidCollisions = true, keepMounted = false, trigger, children,
}: DropdownProps): React.JSX.Element {
  const [state, setState] = useState<"closed" | "open" | "closing">("closed");
  // Disabling an open dropdown also clears its state, so re-enabling cannot reopen it.
  if (disabled && state !== "closed") setState("closed");
  const isOpen = state === "open" && !disabled;
  const triggerWrap = useRef<HTMLSpanElement>(null);
  const menuEl = useRef<HTMLDivElement>(null);
  const trap = useRef<FocusTrap | null>(null);
  const pendingFocus = useRef<"first" | "last" | null>(null);
  const pointerFrame = useRef<number | null>(null);
  const pendingItem = useRef<HTMLElement | null>(null);
  const menuId = useId();
  const { refs, floatingStyles, resolvedSide, resolvedAlign, isPositioned } = useFloatingOverlay({
    open: isOpen, side, align: contentAlign, sideOffset, alignOffset,
    matchTriggerWidth, collisionPadding, avoidCollisions,
  });

  const setReference = useCallback((element: HTMLSpanElement | null) => {
    triggerWrap.current = element;
    refs.setReference(element);
  }, [refs]);
  const setFloating = useCallback((element: HTMLDivElement | null) => {
    menuEl.current = element;
    refs.setFloating(element);
  }, [refs]);

  const focusTrigger = useCallback(() => {
    const element = triggerWrap.current?.firstElementChild;
    if (element instanceof HTMLElement) element.focus();
  }, []);
  const focusMenu = useCallback(() => menuEl.current?.focus(), []);
  const cancelPointerFocus = useCallback(() => {
    pendingItem.current = null;
    if (pointerFrame.current !== null) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = null;
  }, []);
  const close = useCallback((options?: CloseOptions) => {
    if (!isOpen) return;
    trap.current?.deactivate();
    trap.current = null;
    pendingFocus.current = null;
    cancelPointerFocus();
    setState("closing");
    if (options?.restoreFocus) focusTrigger();
  }, [isOpen, cancelPointerFocus, focusTrigger]);
  const open = useCallback(() => { if (!disabled) setState("open"); }, [disabled]);
  const toggle = useCallback(() => { if (isOpen) close(); else open(); }, [isOpen, close, open]);
  const dismiss = useCallback(() => close({ restoreFocus: false }), [close]);

  const getItems = useCallback(() => Array.from(menuEl.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])
    .filter((item) => !item.hasAttribute("aria-disabled") && !item.hasAttribute("disabled")), []);
  const focusItem = useCallback((index: number) => {
    const items = getItems();
    if (!items.length) return;
    const item = items[(index + items.length) % items.length];
    if (document.activeElement === item) return;
    item.focus();
    item.scrollIntoView({ block: "nearest" });
  }, [getItems]);
  const requestItemFocus = useCallback((item: HTMLElement) => {
    if (document.activeElement === item) return;
    pendingItem.current = item;
    if (pointerFrame.current !== null) return;
    pointerFrame.current = requestAnimationFrame(() => {
      pointerFrame.current = null;
      const nextItem = pendingItem.current;
      pendingItem.current = null;
      if (nextItem?.isConnected) nextItem.focus();
    });
  }, []);

  useDismissableLayer({ isOpen, triggerRef: triggerWrap, contentRef: menuEl, onDismiss: dismiss, onOutsideKeydown: blockOutsideKeydown });

  useLayoutEffect(() => {
    if (!isOpen || !isPositioned || !pendingFocus.current) return;
    const target = pendingFocus.current;
    pendingFocus.current = null;
    focusItem(target === "first" ? 0 : getItems().length - 1);
  }, [isOpen, isPositioned, focusItem, getItems]);

  useEffect(() => {
    if (!isOpen || !isPositioned) return;
    const timer = window.setTimeout(() => {
      const element = menuEl.current;
      if (!element) return;
      const focusTrap = createFocusTrap(element, {
        escapeDeactivates: false, clickOutsideDeactivates: false, allowOutsideClick: true,
        returnFocusOnDeactivate: false, isKeyForward: () => false, isKeyBackward: () => false,
        fallbackFocus: element,
        initialFocus: () => element.contains(document.activeElement) ? false : (element.querySelector<HTMLElement>("[data-autofocus]") ?? element),
      });
      trap.current = focusTrap;
      focusTrap.activate();
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 100);
    return () => {
      clearTimeout(timer);
      trap.current?.deactivate();
      trap.current = null;
    };
  }, [isOpen, isPositioned]);

  useEffect(() => {
    if (state !== "closing") return;
    const timer = window.setTimeout(() => setState("closed"), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 100);
    return () => clearTimeout(timer);
  }, [state]);
  useEffect(() => cancelPointerFocus, [isOpen, cancelPointerFocus]);

  const onTriggerKeydown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (disabled) return;
    switch (event.key) {
      case "Enter": case " ": event.preventDefault(); toggle(); break;
      case "ArrowDown": case "ArrowUp":
        event.preventDefault();
        if (isOpen) focusItem(event.key === "ArrowDown" ? 0 : getItems().length - 1);
        else { pendingFocus.current = event.key === "ArrowDown" ? "first" : "last"; open(); }
        break;
      case "Escape": event.preventDefault(); close(); break;
    }
  };
  const onMenuKeydown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") { close({ restoreFocus: true }); return; }
    if (event.repeat) { event.preventDefault(); return; }
    const items = getItems();
    if (!items.length) { if (event.key === "Escape") close(); return; }
    const index = items.findIndex((item) => item === document.activeElement);
    switch (event.key) {
      case "Escape": event.preventDefault(); close({ restoreFocus: true }); break;
      case "ArrowDown": event.preventDefault(); focusItem(index < 0 ? 0 : index + 1); break;
      case "ArrowUp": event.preventDefault(); focusItem(index < 0 ? items.length - 1 : index - 1); break;
      case "Home": event.preventDefault(); focusItem(0); break;
      case "End": event.preventDefault(); focusItem(items.length - 1); break;
    }
  };
  const onMenuClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!closeOnSelect || !(event.target instanceof Element)) return;
    const item = event.target.closest('[role="menuitem"]');
    if (item && !item.hasAttribute("aria-disabled") && !item.hasAttribute("disabled")) close({ restoreFocus: true });
  };
  const context = useMemo(() => ({ close, focusTrigger, focusMenu, requestItemFocus }), [close, focusTrigger, focusMenu, requestItemFocus]);
  const triggerAttrs: TriggerAttrs = { "aria-haspopup": "menu", "aria-expanded": isOpen ? "true" : "false", "aria-controls": menuId };
  const visible = state !== "closed" && !disabled;

  return (
    <DropdownContext.Provider value={context}>
      <span ref={setReference} className={styles.dropdown__trigger} onKeyDown={onTriggerKeydown}>
        <DropdownTriggerSlot render={trigger} controls={{ isOpen, toggle, open, close, triggerAttrs }} />
      </span>
      {typeof document !== "undefined" && (keepMounted || visible) && createPortal(
        <div
          ref={setFloating} id={menuId} role="menu" tabIndex={-1}
          className={styles.dropdown__menu}
          style={{ ...floatingStyles, visibility: isOpen && !isPositioned ? "hidden" : undefined }}
          data-side={resolvedSide} data-align={resolvedAlign} data-state={state}
          hidden={!visible} inert={!isOpen} aria-hidden={!isOpen || undefined}
          onKeyDown={onMenuKeydown} onClickCapture={onMenuClick}>
          <DropdownContentSlot close={close}>{children}</DropdownContentSlot>
        </div>, document.body,
      )}
    </DropdownContext.Provider>
  );
}
