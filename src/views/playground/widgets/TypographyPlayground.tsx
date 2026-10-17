import type { ReactNode } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { TabButton, TabLayout } from '@/library/components/tabs'
import { BlockText } from '@/library/components/text/BlockText'
import { InlineText } from '@/library/components/text/InlineText'
import type { Block, Font, Inline, Tone, Weight } from '@/library/components/text/text'
import { PlaygroundTable } from '../layouts/PlaygroundTable'
import { PlaygroundShowcase } from '../layouts/PlaygroundShowcase'
import styles from '../layouts/Playground.module.scss'
import React from 'react'

const headers: Block[] = ['p', 'h6', 'h5', 'h4', 'h3', 'h2', 'h1']
const inline: Inline[] = [
  'span',
  'small',
  'sub',
  'sup',
  'strong',
  'b',
  'em',
  'i',
  'q',
  'del',
  's',
  'ins',
  'u',
  'code',
  'mark',
]
const colors: Tone[] = ['primary', 'secondary', 'tertiary']
const fonts: Font[] = ['base', 'display', 'code', 'emphasis']
const weights: Weight[] = [
  'thin',
  'extralight',
  'light',
  'normal',
  'medium',
  'semibold',
  'bold',
  'extrabold',
  'black',
]

export function TypographyPlayground() {
  const { t } = useTranslation()
  const pangram = t('playground.copy.pangram')
  const table = <T extends string>(group: string, values: T[], render: (value: T) => ReactNode) => (
    <PlaygroundTable>
      {values.map((value) => (
        <tr key={value}>
          <th scope="row">
            <InlineText size="sm">{t(`playground.table.${group}.${value}`)}</InlineText>
          </th>
          <td>
            <div className={styles.cell}>{render(value)}</div>
          </td>
        </tr>
      ))}
    </PlaygroundTable>
  )

  return (
    <TabLayout
      tabs={
        <React.Fragment>
          {[
            ['block', 'blockText'],
            ['inline', 'inlineText'],
            ['colors', 'textColor'],
            ['family', 'fontFamily'],
            ['weight', 'fontWeight'],
            ['examples', 'examples'],
          ].map(([id, key]) => (
            <TabButton key={id} id={id}>
              {t(`playground.header.tabs.${key}`)}
            </TabButton>
          ))}
        </React.Fragment>
      }
      panels={{
        block: table('block', headers, (element) => (
          <BlockText element={element}>{pangram}</BlockText>
        )),
        inline: table('inline', inline, (element) => (
          <InlineText element={element}>{pangram}</InlineText>
        )),
        colors: table('textTone', colors, (tone) => <BlockText tone={tone}>{pangram}</BlockText>),
        family: table('font', fonts, (font) => <BlockText font={font}>{pangram}</BlockText>),
        weight: table('weight', weights, (weight) => (
          <BlockText weight={weight}>{pangram}</BlockText>
        )),
        examples: (
          <PlaygroundShowcase>
            <div className={styles.grid}>
              <div className={styles.full}>
                <BlockText element="h1">{t('playground.copy.typographyTitle')}</BlockText>
              </div>
              <BlockText>{t('playground.copy.typographyBody')}</BlockText>
              <BlockText>
                <Trans
                  i18nKey="playground.copy.inlineEmphasis"
                  values={{
                    strong: t('playground.copy.strong'),
                    emphasis: t('playground.copy.emphasis'),
                    highlighting: t('playground.copy.highlighting'),
                    inlineCode: t('playground.copy.inlineCode'),
                  }}
                  components={[
                    <InlineText element="strong">{t('playground.copy.strong')}</InlineText>,
                    <InlineText element="em">{t('playground.copy.emphasis')}</InlineText>,
                    <InlineText element="mark">{t('playground.copy.highlighting')}</InlineText>,
                    <InlineText element="code">{t('playground.copy.inlineCode')}</InlineText>,
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
