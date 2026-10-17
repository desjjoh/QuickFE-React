import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@/library/components/button/IconButton'
import type { Size } from '@/library/components/button/buttons'
import { BaseDropdown, MenuButton, MenuViewport, type Align } from '@/library/components/dropdowns'
import { InlineText } from '@/library/components/text/InlineText'
import { LOCALES } from '@/shared/i18n'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { selectLocale, setLocale } from '@/shared/stores/locale'
import styles from './LanguageDropdown.module.scss'

type Props = { contentAlign?: Align; size?: Size }

export function LanguageDropdown({ contentAlign = 'start', size }: Props): React.JSX.Element {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const activeLocale = useAppSelector(selectLocale)

  return (
    <BaseDropdown
      contentAlign={contentAlign}
      trigger={({ toggle, triggerAttrs }) => (
        <IconButton
          {...triggerAttrs}
          icon={Languages}
          label={t('accessibility.languageMenu')}
          tone="neutral"
          variant="ghost"
          size={size}
          onClick={toggle}
        />
      )}
    >
      <MenuViewport>
        {Object.values(LOCALES).map((locale) => (
          <MenuButton
            key={locale.key}
            active={locale.key === activeLocale}
            onClick={() => dispatch(setLocale(locale.key))}
          >
            <InlineText>{locale.display}</InlineText>
            <img
              className={styles.flag}
              src={locale.flag}
              alt={locale.display}
              loading="eager"
              decoding="async"
            />
          </MenuButton>
        ))}
      </MenuViewport>
    </BaseDropdown>
  )
}
