import React, { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { NavBar } from '@/library/components/navbar/NavBar'
import { useViewport } from '@/shared/hooks/useViewport'
import { useDynamicPageTitle } from '@/shared/hooks/useDynamicTitle'
import { BrandNavigation } from './widgets/navigation/BrandNavigation'
import { MainNavigation } from './widgets/navigation/MainNavigation'
import { mainNavigation, moreNavigation } from './config/navigation'
import { MoreDropdown } from './widgets/dropdowns/MoreDropdown'
import { FlexBox } from '@/library/components/flex/FlexBox'
import { ThemeToggle } from './widgets/buttons/ThemeToggle'
import { LanguageDropdown } from './widgets/dropdowns/LanguageDropdown'

import styles from './styles/AppFrame.module.scss'

function AppFrame(): React.JSX.Element {
  useDynamicPageTitle()
  const contentRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const { isDesktop } = useViewport()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    contentRef.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }, [pathname])

  const navigationStart = isDesktop ? (
    <React.Fragment>
      <BrandNavigation />
      <MainNavigation routes={mainNavigation} />
      <MoreDropdown routes={moreNavigation} />
    </React.Fragment>
  ) : null

  const navigationCenter = isDesktop ? null : <BrandNavigation hideText />
  const navigationEnd = isDesktop ? (
    <FlexBox gap={2}>
      <ThemeToggle />
      <LanguageDropdown contentAlign="end" />
    </FlexBox>
  ) : null

  return (
    <div className={styles.appFrame}>
      <main ref={contentRef} className={styles.frameMain} data-app-shell-scroll>
        <header className={styles.frameHeader}>
          <NavBar
            centered={!isDesktop}
            start={navigationStart}
            center={navigationCenter}
            end={navigationEnd}
          />
        </header>
        <div className={styles.frameContent}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppFrame
