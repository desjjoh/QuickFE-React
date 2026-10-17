import type { Radius, Size, Tone, Variant } from '@/library/components/button/buttons'

export const sizes: Size[] = ['sm', 'md', 'lg', 'xl']
export const radii: Radius[] = ['none', 'sm', 'md', 'lg', 'full']
export const variants: Variant[] = ['solid', 'soft', 'surface', 'outline', 'ghost']
export const tones: Tone[] = ['primary', 'neutral', 'success', 'warning', 'danger', 'info']
export const states = [
  { label: 'default', disabled: false, loading: false },
  { label: 'disabled', disabled: true, loading: false },
  { label: 'loading', disabled: false, loading: true },
] as const
