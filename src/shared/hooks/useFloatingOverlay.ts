import { useEffect } from 'react'
import { autoUpdate, flip, offset, size, useFloating, type Placement } from '@floating-ui/react-dom'

type Options = {
  open: boolean
  side: 'top' | 'bottom' | 'left' | 'right'
  align: 'start' | 'center' | 'end'
  sideOffset: number
  alignOffset: number
  collisionPadding: number
  avoidCollisions: boolean
  matchTriggerWidth?: boolean
}

export function useFloatingOverlay({
  open,
  side,
  align,
  sideOffset,
  alignOffset,
  collisionPadding,
  avoidCollisions,
  matchTriggerWidth = false,
}: Options) {
  const placement: Placement = align === 'center' ? side : `${side}-${align}`
  const floating = useFloating({
    open,
    placement,
    strategy: 'fixed',
    transform: false,
    middleware: [
      offset({ mainAxis: sideOffset, crossAxis: alignOffset }),
      ...(avoidCollisions ? [flip({ padding: collisionPadding })] : []),
      ...(matchTriggerWidth
        ? [
            size({
              padding: collisionPadding,
              apply({ rects, elements, availableHeight }) {
                Object.assign(elements.floating.style, {
                  minWidth: `${Math.round(rects.reference.width)}px`,
                  maxHeight: `${Math.max(0, Math.floor(availableHeight))}px`,
                })
              },
            }),
          ]
        : []),
    ],
  })

  const { reference, floating: element } = floating.elements
  const { update } = floating
  useEffect(() => {
    // Kept-mounted menus must not retain resize/scroll observers while closed.
    if (!open || !reference || !element) return
    return autoUpdate(reference, element, update)
  }, [open, reference, element, update])

  useEffect(() => {
    if (matchTriggerWidth || !element) return
    element.style.removeProperty('min-width')
    element.style.removeProperty('max-height')
  }, [matchTriggerWidth, element])

  const [resolvedSide, resolvedAlign = 'center'] = floating.placement.split('-')
  return { ...floating, resolvedSide, resolvedAlign }
}
