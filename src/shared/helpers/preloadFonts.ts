const APP_FONTS = [
  '400 16px "Nunito Sans"',
  '400 16px "Outfit"',
  '400 16px "JetBrains Mono"',
  '400 16px "Merriweather"',
  'italic 400 16px "Merriweather"',
] as const

// Load through the registered CSS faces, including their Unicode subsets.
// Unlike HTML preloads, these requests don't require immediate use on the page.
export async function preloadFonts(): Promise<void> {
  if (typeof document === 'undefined' || !document.fonts) return

  // Font failures must not block the app; the CSS fallback stacks still apply.
  await Promise.allSettled(APP_FONTS.map((font) => document.fonts.load(font)))
}
