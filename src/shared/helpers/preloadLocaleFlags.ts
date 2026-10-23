import { LOCALES } from '../i18n/config'

// Retain the image objects so the browser can reuse them throughout the app session.
const flagImages = new Map<string, HTMLImageElement>()

export async function preloadLocaleFlags(): Promise<void> {
  if (typeof Image === 'undefined') return

  const loading = Object.values(LOCALES).map(({ flag }) => {
    let image = flagImages.get(flag)

    if (!image) {
      image = new Image()
      image.decoding = 'async'
      image.src = flag
      flagImages.set(flag, image)
    }

    return image.decode()
  })

  // A missing flag must not prevent the app or language selector from working.
  await Promise.allSettled(loading)
}
