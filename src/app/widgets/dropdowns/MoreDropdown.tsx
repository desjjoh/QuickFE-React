import { EllipsisVertical } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { IconButton } from '@/library/components/button/IconButton'
import { BaseDropdown, MenuRouter, MenuViewport } from '@/library/components/dropdowns'
import type { iRoute } from '@/app/config/navigation'

type Props = { routes: readonly iRoute[] }

export function MoreDropdown({ routes }: Props): React.JSX.Element {
  const { t } = useTranslation()

  return (
    <BaseDropdown
      trigger={({ toggle, triggerAttrs }) => (
        <IconButton
          {...triggerAttrs}
          icon={EllipsisVertical}
          label={t('common.options')}
          tone="neutral"
          variant="ghost"
          onClick={toggle}
        />
      )}
    >
      <MenuViewport>
        {routes.map((route, index) => (
          <MenuRouter key={index} to={route.to}>
            {t(route.label)}
          </MenuRouter>
        ))}
      </MenuViewport>
    </BaseDropdown>
  )
}
