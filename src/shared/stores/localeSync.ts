import i18n from '../i18n'
import { isAppLocale, resolveInitialLocale, STORAGE_KEY, type AppLocales } from '../i18n/config'
import type { AppStore } from './index'
import { setLocale } from './locale'

const CHANNEL_NAME = 'quickfe-locale'

function applyLocale(locale: AppLocales): void {
  void i18n.changeLanguage(locale)
  document.documentElement.lang = locale

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(locale))
  } catch {
    // Language changes still work when browser storage is unavailable.
  }
}

// Keep browser effects outside reducers, matching the theme store lifecycle.
export function initializeLocale(store: AppStore): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {}

  const locale = isAppLocale(i18n.language) ? i18n.language : resolveInitialLocale()

  store.dispatch(setLocale(locale))
  applyLocale(locale)

  const source = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36)
  let channel: BroadcastChannel | null = null

  try {
    if ('BroadcastChannel' in window) channel = new window.BroadcastChannel(CHANNEL_NAME)
  } catch {
    // Cross-tab synchronization is optional when the browser blocks it.
  }

  let currentLocale = locale
  let receiving = false
  const unsubscribe = store.subscribe(() => {
    const nextLocale = store.getState().locale.locale

    if (nextLocale === currentLocale) return
    currentLocale = nextLocale
    applyLocale(nextLocale)
    if (!receiving) channel?.postMessage({ type: 'locale:changed', source, locale: nextLocale })
  })

  const onMessage = (event: MessageEvent<unknown>): void => {
    const message = event.data

    if (
      typeof message !== 'object' ||
      message === null ||
      !('type' in message) ||
      !('source' in message) ||
      !('locale' in message)
    )
      return
    if (
      message.type !== 'locale:changed' ||
      message.source === source ||
      !isAppLocale(message.locale)
    )
      return

    receiving = true

    try {
      store.dispatch(setLocale(message.locale))
    } finally {
      receiving = false
    }
  }

  channel?.addEventListener('message', onMessage)

  return () => {
    unsubscribe()
    channel?.removeEventListener('message', onMessage)
    channel?.close()
  }
}
