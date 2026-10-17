import { useTranslation } from 'react-i18next'
import { StackedLayout } from '@/shared/layouts/StackedLayout'
import { PlaygroundContent } from './layouts/PlaygroundContent'
import { PlaygroundSection } from './layouts/PlaygroundSection'
import { ButtonPlayground } from './widgets/ButtonPlayground'
import { ButtonLinkPlayground } from './widgets/ButtonLinkPlayground'
import { IconButtonPlayground } from './widgets/IconButtonPlayground'
import { DropdownPlayground } from './widgets/DropdownPlayground'
import { LinkPlayground } from './widgets/LinkPlayground'
import { TabsPlayground } from './widgets/TabsPlayground'
import { TypographyPlayground } from './widgets/TypographyPlayground'

const sections = [
  ['button', ButtonPlayground],
  ['buttonLinks', ButtonLinkPlayground],
  ['dropdownMenu', DropdownPlayground],
  ['iconButton', IconButtonPlayground],
  ['link', LinkPlayground],
  ['tabs', TabsPlayground],
  ['typography', TypographyPlayground],
] as const

export function PlaygroundView() {
  const { t } = useTranslation()

  return (
    <StackedLayout>
      <PlaygroundContent>
        {sections.map(([key, Widget]) => (
          <PlaygroundSection key={key} title={t(`playground.header.sections.${key}`)}>
            <Widget />
          </PlaygroundSection>
        ))}
      </PlaygroundContent>
    </StackedLayout>
  )
}
