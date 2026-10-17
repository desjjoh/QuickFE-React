import { useEffect, type RefObject } from 'react'

type Options = {
  isOpen: boolean
  triggerRef: RefObject<HTMLElement | null>
  contentRef: RefObject<HTMLElement | null>
  onDismiss: () => void
  onOutsideKeydown?: (event: KeyboardEvent) => void
}

export function useDismissableLayer({
  isOpen,
  triggerRef,
  contentRef,
  onDismiss,
  onOutsideKeydown,
}: Options): void {
  useEffect(() => {
    if (!isOpen) return
    const inside = (target: EventTarget | null) =>
      target instanceof Node &&
      (triggerRef.current?.contains(target) || contentRef.current?.contains(target))
    const onPointerDown = (event: PointerEvent) => {
      if (!inside(event.target)) onDismiss()
    }
    const onFocusIn = (event: FocusEvent) => {
      if (!inside(event.target)) onDismiss()
    }
    const onKeydown = (event: KeyboardEvent) => {
      if (!inside(event.target)) onOutsideKeydown?.(event)
    }
    const onScrollInteraction = (event: WheelEvent | TouchEvent) => {
      if (!(event.target instanceof Node) || !contentRef.current?.contains(event.target))
        onDismiss()
    }

    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('focusin', onFocusIn)
    if (onOutsideKeydown) document.addEventListener('keydown', onKeydown, true)
    document.addEventListener('wheel', onScrollInteraction, { capture: true, passive: true })
    document.addEventListener('touchmove', onScrollInteraction, { capture: true, passive: true })
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('keydown', onKeydown, true)
      document.removeEventListener('wheel', onScrollInteraction, true)
      document.removeEventListener('touchmove', onScrollInteraction, true)
    }
  }, [isOpen, triggerRef, contentRef, onDismiss, onOutsideKeydown])
}
