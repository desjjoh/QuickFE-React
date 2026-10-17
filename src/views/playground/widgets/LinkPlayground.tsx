import { Trans, useTranslation } from 'react-i18next'
import { TabButton, TabLayout } from '@/library/components/tabs'
import { AppLink } from '@/library/components/links/AppLink'
import { BlockText } from '@/library/components/text/BlockText'
import { InlineText } from '@/library/components/text/InlineText'
import { PlaygroundShowcase } from '../layouts/PlaygroundShowcase'
import { PlaygroundTable } from '../layouts/PlaygroundTable'
import { tones } from './options'
import styles from '../layouts/Playground.module.scss'
import React from 'react'

export function LinkPlayground() {
  const { t } = useTranslation()
  return (
    <TabLayout
      tabs={
        <React.Fragment>
          <TabButton id="colors">{t('playground.header.tabs.themeColors')}</TabButton>
          <TabButton id="examples">{t('playground.header.tabs.examples')}</TabButton>
        </React.Fragment>
      }
      panels={{
        colors: (
          <PlaygroundTable>
            {tones.map((tone) => (
              <tr key={tone}>
                <th scope="row">
                  <InlineText size="sm">{t(`playground.table.tone.${tone}`)}</InlineText>
                </th>
                <td>
                  <div className={styles.cell}>
                    <AppLink href="#" tone={tone}>
                      {t(`playground.link.tone.${tone}`)}
                    </AppLink>
                  </div>
                </td>
              </tr>
            ))}
          </PlaygroundTable>
        ),
        examples: (
          <PlaygroundShowcase>
            <div className={styles.grid}>
              <BlockText>
                <Trans
                  i18nKey="playground.copy.linkDemo"
                  values={{
                    graphicDesigner: t('playground.copy.graphicDesigner'),
                    interface: t('playground.copy.interface'),
                    typefaces: t('playground.copy.typefaces'),
                    appleMacintosh: t('playground.copy.appleMacintosh'),
                  }}
                  components={[
                    <AppLink href="#">{t('playground.copy.graphicDesigner')}</AppLink>,
                    <AppLink href="#">{t('playground.copy.interface')}</AppLink>,
                    <AppLink href="#">{t('playground.copy.typefaces')}</AppLink>,
                    <AppLink href="#">{t('playground.copy.appleMacintosh')}</AppLink>,
                  ]}
                />
              </BlockText>
              <BlockText>
                <Trans
                  i18nKey="playground.copy.warningLinkDemo"
                  values={{ pausingSubscription: t('playground.copy.pausingSubscription') }}
                  components={[
                    <AppLink href="#" tone="warning">
                      {t('playground.copy.pausingSubscription')}
                    </AppLink>,
                  ]}
                />
              </BlockText>
            </div>
          </PlaygroundShowcase>
        ),
      }}
    />
  )
}
