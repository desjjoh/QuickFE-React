import { useTranslation } from 'react-i18next'
import { TabButton, TabLayout, type Tone } from '@/library/components/tabs'
import { InlineText } from '@/library/components/text/InlineText'
import { PlaygroundTable } from '../layouts/PlaygroundTable'
import React from 'react'

const tones: Tone[] = ['primary', 'neutral']

export function TabsPlayground() {
  const { t } = useTranslation()

  return (
    <TabLayout
      tabs={<TabButton id="colors">{t('playground.header.tabs.themeColors')}</TabButton>}
      panels={{
        colors: (
          <PlaygroundTable>
            {tones.map((tone) => (
              <tr key={tone}>
                <th scope="row">
                  <InlineText size="sm">{t(`playground.table.tone.${tone}`)}</InlineText>
                </th>
                <td>
                  <TabLayout
                    tone={tone}
                    tabs={
                      <React.Fragment>
                        <TabButton id="accounts">{t('app.routes.profile')}</TabButton>
                        <TabButton id="documents">
                          {t('playground.header.sections.forms')}
                        </TabButton>
                      </React.Fragment>
                    }
                  />
                </td>
              </tr>
            ))}
          </PlaygroundTable>
        ),
      }}
    />
  )
}
