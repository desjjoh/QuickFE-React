import { ArrowRight, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/library/components/button/Button'
import { IconButton } from '@/library/components/button/IconButton'
import { ButtonLink } from '@/library/components/links/ButtonLink'
import type { Radius, Size, Tone, Variant } from '@/library/components/button/buttons'
import { FlexBox } from '@/library/components/flex/FlexBox'
import { InlineText } from '@/library/components/text/InlineText'
import { TabButton, TabLayout } from '@/library/components/tabs'
import { PlaygroundTable } from '../layouts/PlaygroundTable'
import styles from '../layouts/Playground.module.scss'
import { radii, sizes, states, tones, variants } from './options'
import React from 'react'

type Kind = 'button' | 'icon' | 'link'
type ExampleProps = {
  kind: Kind
  variant?: Variant
  tone?: Tone
  size?: Size
  radius?: Radius
  disabled?: boolean
  loading?: boolean
}

function Example({ kind, disabled, loading, ...props }: ExampleProps) {
  const { t } = useTranslation()

  if (kind === 'icon')
    return (
      <IconButton
        {...props}
        disabled={disabled}
        loading={loading}
        icon={Star}
        label={t('accessibility.iconButton')}
      />
    )
  if (kind === 'link')
    return (
      <ButtonLink {...props} to="#" icon={ArrowRight}>
        {t('playground.action.next')}
      </ButtonLink>
    )

  return (
    <Button {...props} disabled={disabled} loading={loading} icon={ArrowRight}>
      {t('playground.action.next')}
    </Button>
  )
}

export function ButtonExamples({ kind }: { kind: Kind }) {
  const { t } = useTranslation()
  const label = (group: string, key: string) => (
    <InlineText size="sm">{t(`playground.table.${group}.${key}`)}</InlineText>
  )

  return (
    <TabLayout
      tabs={
        <React.Fragment>
          <TabButton id="colors">{t('playground.header.tabs.themeColors')}</TabButton>
          <TabButton id="sizes">{t('playground.header.tabs.allSizes')}</TabButton>
          {kind === 'button' && (
            <TabButton id="states">{t('playground.header.tabs.allStates')}</TabButton>
          )}
        </React.Fragment>
      }
      panels={{
        colors: (
          <PlaygroundTable
            head={
              <tr>
                <th />
                {tones.map((tone) => (
                  <th key={tone} scope="col">
                    {label('tone', tone)}
                  </th>
                ))}
              </tr>
            }
          >
            {variants.map((variant) => (
              <tr key={variant}>
                <th scope="row">{label('variant', variant)}</th>
                {tones.map((tone) => (
                  <td key={tone}>
                    <div className={styles.cell}>
                      {kind === 'icon' ? (
                        <FlexBox gap={3}>
                          {states.map((state) => (
                            <Example
                              key={state.label}
                              kind={kind}
                              variant={variant}
                              tone={tone}
                              disabled={state.disabled}
                              loading={state.loading}
                            />
                          ))}
                        </FlexBox>
                      ) : (
                        <Example kind={kind} variant={variant} tone={tone} />
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </PlaygroundTable>
        ),
        sizes: (
          <PlaygroundTable
            head={
              <tr>
                <th />
                {radii.map((radius) => (
                  <th key={radius} scope="col">
                    {label('radius', radius)}
                  </th>
                ))}
              </tr>
            }
          >
            {sizes.map((size) => (
              <tr key={size}>
                <th scope="row">{label('size', size)}</th>
                {radii.map((radius) => (
                  <td key={radius}>
                    <div className={styles.cell}>
                      <Example kind={kind} size={size} radius={radius} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </PlaygroundTable>
        ),
        states:
          kind === 'button' ? (
            <PlaygroundTable
              head={
                <tr>
                  <th />
                  {states.map((state) => (
                    <th key={state.label} scope="col">
                      {label('state', state.label)}
                    </th>
                  ))}
                </tr>
              }
            >
              {variants.map((variant) => (
                <tr key={variant}>
                  <th scope="row">{label('variant', variant)}</th>
                  {states.map((state) => (
                    <td key={state.label}>
                      <div className={styles.cell}>
                        <Example
                          kind={kind}
                          variant={variant}
                          disabled={state.disabled}
                          loading={state.loading}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </PlaygroundTable>
          ) : undefined,
      }}
    />
  )
}
