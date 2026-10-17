import { ChevronDown, EllipsisVertical } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { TabButton, TabLayout } from '@/library/components/tabs'
import {
  BaseDropdown,
  MenuButton,
  MenuSeperator,
  MenuViewport,
} from '@/library/components/dropdowns'
import { Button } from '@/library/components/button/Button'
import { IconButton } from '@/library/components/button/IconButton'
import { InlineText } from '@/library/components/text/InlineText'
import { FlexBox } from '@/library/components/flex/FlexBox'

export function DropdownPlayground() {
  const { t } = useTranslation()
  return (
    <TabLayout
      tabs={<TabButton id="examples">{t('playground.header.tabs.examples')}</TabButton>}
      panels={{
        examples: (
          <FlexBox gap={2}>
            <BaseDropdown
              trigger={({ toggle, triggerAttrs }) => (
                <Button {...triggerAttrs} variant="soft" onClick={toggle} icon={ChevronDown}>
                  {t('common.options')}
                </Button>
              )}
            >
              <MenuViewport>
                <MenuButton>
                  {t('playground.action.edit')}
                  <InlineText>⌘ E</InlineText>
                </MenuButton>
                <MenuButton>
                  {t('playground.action.share')}
                  <InlineText>⌘ D</InlineText>
                </MenuButton>
                <MenuSeperator />
                <MenuButton>
                  {t('playground.action.archive')}
                  <InlineText>⌘ N</InlineText>
                </MenuButton>
                <MenuSeperator />
                <MenuButton>{t('playground.action.share')}</MenuButton>
                <MenuButton>{t('playground.action.addToFavorites')}</MenuButton>
                <MenuSeperator />
                <MenuButton tone="danger">
                  {t('playground.action.delete')}
                  <InlineText>⌘ ⌫</InlineText>
                </MenuButton>
              </MenuViewport>
            </BaseDropdown>
            <BaseDropdown
              trigger={({ toggle, triggerAttrs }) => (
                <IconButton
                  {...triggerAttrs}
                  icon={EllipsisVertical}
                  label={t('common.options')}
                  tone="neutral"
                  variant="soft"
                  onClick={toggle}
                />
              )}
            >
              <MenuViewport>
                <MenuButton>{t('playground.action.viewProfile')}</MenuButton>
                <MenuButton>{t('playground.action.changeRole')}</MenuButton>
                <MenuSeperator />
                <MenuButton tone="danger">{t('playground.action.remove')}</MenuButton>
              </MenuViewport>
            </BaseDropdown>
          </FlexBox>
        ),
      }}
    />
  )
}
