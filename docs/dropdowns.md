# Dropdown menus

[Back to README](../README.md)

The React dropdown system follows QuickFE-Vue3's component boundaries and defaults.
Open state is local to each dropdown. No Redux slice or application-level host is required.

```tsx
<BaseDropdown
  contentAlign="end"
  trigger={({ toggle, triggerAttrs }) => (
    <IconButton
      {...triggerAttrs}
      icon={EllipsisVertical}
      label="Options"
      tone="neutral"
      variant="ghost"
      onClick={toggle}
    />
  )}
>
  <MenuViewport>
    <MenuRouter to="/playground">Playground</MenuRouter>
    <MenuSeperator />
    <MenuButton onClick={handleAction}>Action</MenuButton>
  </MenuViewport>
</BaseDropdown>
```

The trigger render function must return a single focusable control as the wrapper's
first element. Spread `triggerAttrs` onto that control and connect `toggle` to its
click handler. The slot also exposes `isOpen`, `open`, and `close`.
For explicit closing, children can be a function: `children={({ close }) => ...}`.
Menu buttons and router items must be descendants of `BaseDropdown` and should be
inside `MenuViewport` for styling. `MenuSeperator` retains Vue's component spelling.

## Responsibilities

- `BaseDropdown`: local state, trigger ARIA, body portal, keyboard navigation,
  transition presence, focus trap, and shared item context.
- `useFloatingOverlay`: fixed positioning with Floating UI, offsets, optional
  flipping and width matching, plus resize/scroll observers while open.
- `useDismissableLayer`: outside pointer/focus dismissal, outside-key handling,
  and outside wheel/touch dismissal. Listeners are removed when closed/unmounted.
- `MenuViewport`, `MenuButton`, `MenuRouter`, `MenuSeperator`: Vue-equivalent
  structure and styling, consolidated into `Dropdown.module.scss`.

The focus trap uses the same package and keyboard overrides as Vue. Escape and
selection restore focus to the trigger; outside interaction does not. Tab and
Shift+Tab close the dropdown and continue normal tab navigation from the trigger.
Arrow keys wrap between enabled items; Home/End focus the first/last item.
Pointer movement focuses enabled items. Empty menus use the menu as fallback focus.
Vue's empty-menu Escape branch closes without explicitly restoring trigger focus.

Vue transition values are expressed as local CSS animations in React. Closing
menus become inert and inaccessible immediately, even while fading out. Animation
timers, focus traps, observers, and pending pointer-focus frames are cleaned up.
Kept-mounted closed menus are hidden and have no active placement observers.

## Defaults and parity limits

| Option                       | Default   |
| ---------------------------- | --------- |
| `closeOnSelect`              | `true`    |
| `disabled`                   | `false`   |
| `side`                       | `bottom`  |
| `contentAlign`               | `start`   |
| `sideOffset` / `alignOffset` | `8` / `0` |
| `matchTriggerWidth`          | `false`   |
| `collisionPadding`           | `8`       |
| `avoidCollisions`            | `true`    |
| `keepMounted`                | `false`   |

Collision handling flips placement; it does not add shifting. Available-height
sizing is enabled with `matchTriggerWidth`, as in Vue. The normal menu maximum
height is 400px. Nested submenus are outside this first implementation.
Vue declares an unused `modal` option; React does not expose an inactive option.
Color tokens are unchanged.

## Verification

Start `npm run dev`, then open `/playground` and use the dropdown examples.
The earlier `/test/manual/dropdowns.html` fixture is no longer checked in.
Empty, disabled, kept-mounted, width-matched, and viewport-edge cases require
dedicated consumers to exercise them; the current playground is not full coverage.

Browser regression checklist:

- Enter/Space toggles without double activation; ArrowDown/ArrowUp opens at the
  first/last enabled item. Arrows wrap, skip disabled items, and scroll long lists.
- Escape restores trigger focus for populated menus. Tab/Shift+Tab close and move
  to the next/previous page control. Outside clicks retain outside focus.
- Selection runs the action/navigation and closes by default. Disable
  `closeOnSelect` to keep it open. Disabled items do not navigate or invoke actions.
- Kept-mounted menus become hidden/inert after close. Turning off width matching
  removes the previous inline constraints. Disabling or unmounting an open menu
  releases focus and listeners.
- Edge examples flip above the trigger and remain usable at mobile sizes.
  Outside wheel/touch interactions dismiss; scrolling the menu itself remains usable.
- Check both themes, empty menus, repeated open/close, and reduced-motion settings.

This is a manual regression checklist, not an automated browser suite.
See [Testing](testing.md) for current verification limits.
