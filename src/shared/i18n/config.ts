export const LOCALES = {
  en: {
    display: 'English',
    key: 'en',
    flag: '/assets/flags/united-kingdom.svg',
  },
} as const

export type AppLocales = keyof typeof LOCALES
export const FALLBACK_LOCALE: AppLocales = 'en'
export const STORAGE_KEY = 'i18n-locale'

export function isAppLocale(value: unknown): value is AppLocales {
  return typeof value === 'string' && Object.hasOwn(LOCALES, value)
}

export function resolveInitialLocale(): AppLocales {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')

    if (isAppLocale(stored)) return stored
  } catch {
    // Invalid or unavailable storage must not prevent startup.
  }

  return FALLBACK_LOCALE
}
