import type { DropdownProps, TriggerControls } from "./dropdowns";

// Render slots separately from lifecycle code. Controls are event callbacks,
// so rendering a slot never needs to inspect the dropdown's DOM refs.
export function DropdownTriggerSlot({ render, controls }: { render: DropdownProps["trigger"]; controls: TriggerControls }) {
  return render(controls);
}

export function DropdownContentSlot({ children, close }: Pick<DropdownProps, "children"> & Pick<TriggerControls, "close">) {
  return typeof children === "function" ? children({ close }) : children;
}
